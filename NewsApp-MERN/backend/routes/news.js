const express  = require('express');
const router   = express.Router();
const Parser   = require('rss-parser');
const fetch    = require('node-fetch');
const RSS_FEEDS = require('../config/rssFeeds');

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const BASE_URL     = 'https://newsapi.org/v2';

// rss-parser instance — generous timeouts for slow feeds
const rssParser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
      '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:content',   'mediaContent',   { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['enclosure',       'enclosure',      { keepArray: false }],
    ],
  },
});

/**
 * Extract the best image URL from an RSS item.
 * Different feeds use different fields — try them all.
 */
const extractImage = (item) => {
  if (item.mediaContent?.$ ?.url)   return item.mediaContent.$.url;
  if (item.mediaThumbnail?.$ ?.url) return item.mediaThumbnail.$.url;
  if (item.enclosure?.url)          return item.enclosure.url;
  if (item['media:content']?.$ ?.url) return item['media:content'].$.url;

  // Try to pull first <img> from content / summary
  const html = item.content || item.summary || item.contentSnippet || '';
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (match) return match[1];

  return null;
};

/**
 * Fetch a single RSS feed and normalise its items into NewsAPI-like objects.
 * Returns [] on any error so one bad feed never breaks the whole response.
 */
const fetchFeed = async (feedDef) => {
  try {
    const feed = await rssParser.parseURL(feedDef.url);
    return (feed.items || []).map((item) => ({
      source:      { id: null, name: feedDef.name },
      author:      item.creator || item.author || feedDef.name,
      title:       item.title   || 'No Title',
      description: item.contentSnippet || item.summary || item.content || '',
      url:         item.link   || item.guid || '#',
      urlToImage:  extractImage(item),
      publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
      content:     item.content || '',
    }));
  } catch {
    return [];
  }
};

/**
 * Fetch multiple feeds in parallel, merge, deduplicate by URL, sort by date.
 */
const fetchFeeds = async (feedList) => {
  const results = await Promise.all(feedList.map(fetchFeed));
  const all     = results.flat();

  // Deduplicate by URL
  const seen = new Set();
  const unique = all.filter((a) => {
    if (!a.url || a.url === '#' || seen.has(a.url)) return false;
    seen.add(a.url);
    return true;
  });

  // Sort newest first
  unique.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return unique;
};

// ── Fallback: NewsAPI (used only for 'us' when RSS is also available,
//    or as last resort if RSS returns nothing) ──────────────────────────
const fetchFromNewsAPI = async (country, category, page, pageSize) => {
  try {
    const url =
      `${BASE_URL}/top-headlines` +
      `?country=${country}&category=${category}` +
      `&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
    const resp = await fetch(url, { timeout: 8000 });
    const data = await resp.json();
    if (data.status === 'ok' && data.articles?.length > 0) return data;
  } catch { /* ignore */ }
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/news/top-headlines
// ─────────────────────────────────────────────────────────────────────────────
router.get('/top-headlines', async (req, res) => {
  const {
    country  = 'us',
    category = 'general',
    page     = 1,
    pageSize = 9,
  } = req.query;

  const pg   = parseInt(page,     10) || 1;
  const size = parseInt(pageSize, 10) || 9;

  try {
    // 1. Try RSS feeds for this country + category
    const countryFeeds   = RSS_FEEDS[country];
    const categoryFeeds  = countryFeeds
      ? (countryFeeds[category] || countryFeeds['general'] || [])
      : [];

    let articles = [];

    if (categoryFeeds.length > 0) {
      articles = await fetchFeeds(categoryFeeds);
    }

    // 2. If RSS returned nothing, fall back to NewsAPI
    if (articles.length === 0) {
      const apiData = await fetchFromNewsAPI(country, category, pg, size);
      if (apiData) {
        return res.json({
          success:      true,
          totalResults: apiData.totalResults,
          articles:     apiData.articles,
          source:       'newsapi',
        });
      }
    }

    // 3. Paginate the RSS results manually
    const total  = articles.length;
    const start  = (pg - 1) * size;
    const paged  = articles.slice(start, start + size);

    return res.json({
      success:      true,
      totalResults: total,
      articles:     paged,
      source:       'rss',
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch news: ' + err.message,
    });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/news/search
// ─────────────────────────────────────────────────────────────────────────────
router.get('/search', async (req, res) => {
  const { q, page = 1, pageSize = 9, sortBy = 'publishedAt' } = req.query;

  if (!q) {
    return res.status(400).json({
      success: false, message: 'Search query (q) is required',
    });
  }

  try {
    const url =
      `${BASE_URL}/everything` +
      `?q=${encodeURIComponent(q)}` +
      `&apiKey=${NEWS_API_KEY}` +
      `&page=${page}&pageSize=${pageSize}` +
      `&sortBy=${sortBy}&language=en`;

    const response = await fetch(url, { timeout: 8000 });
    const data     = await response.json();

    if (data.status !== 'ok') {
      return res.status(400).json({ success: false, message: data.message });
    }

    res.json({
      success:      true,
      totalResults: data.totalResults,
      articles:     data.articles,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Search failed: ' + err.message });
  }
});

module.exports = router;
