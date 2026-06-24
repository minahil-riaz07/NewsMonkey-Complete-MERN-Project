/**
 * RSS feed sources per country + category.
 * Each entry: { name, url }
 * These are publicly available RSS feeds — no API key needed.
 */

const RSS_FEEDS = {

  // ── Pakistan ────────────────────────────────────────────────────────
  pk: {
    general: [
      { name: 'Geo News',        url: 'https://www.geo.tv/rss/1/1' },
      { name: 'ARY News',        url: 'https://arynews.tv/feed/' },
      { name: 'Dawn',            url: 'https://www.dawn.com/feeds/home' },
      { name: 'Samaa TV',        url: 'https://www.samaa.tv/feed/' },
      { name: 'Express Tribune', url: 'https://tribune.com.pk/feed/home' },
      { name: 'The News Int.',   url: 'https://www.thenews.com.pk/rss/1/1' },
      { name: 'Dunya News',      url: 'https://dunyanews.tv/index.php/en?format=feed&type=rss' },
      { name: 'BOL News',        url: 'https://www.bolnews.com/feed/' },
    ],
    business: [
      { name: 'Dawn Business',        url: 'https://www.dawn.com/feeds/business' },
      { name: 'Express Tribune Biz',  url: 'https://tribune.com.pk/feed/business' },
      { name: 'Geo Business',         url: 'https://www.geo.tv/rss/1/4' },
      { name: 'The News Business',    url: 'https://www.thenews.com.pk/rss/1/2' },
    ],
    sports: [
      { name: 'Geo Sports',      url: 'https://www.geo.tv/rss/1/6' },
      { name: 'ARY Sports',      url: 'https://arynews.tv/category/sports/feed/' },
      { name: 'Dawn Sports',     url: 'https://www.dawn.com/feeds/sport' },
      { name: 'Express Sports',  url: 'https://tribune.com.pk/feed/sports' },
    ],
    technology: [
      { name: 'Dawn Technology',       url: 'https://www.dawn.com/feeds/technology' },
      { name: 'Express Tribune Tech',  url: 'https://tribune.com.pk/feed/technology' },
      { name: 'Propakistani',          url: 'https://propakistani.pk/feed/' },
    ],
    entertainment: [
      { name: 'Geo Entertainment',   url: 'https://www.geo.tv/rss/1/3' },
      { name: 'ARY Entertainment',   url: 'https://arynews.tv/category/entertainment/feed/' },
      { name: 'Express Entertainment',url: 'https://tribune.com.pk/feed/magazine' },
    ],
    health: [
      { name: 'Dawn Health',          url: 'https://www.dawn.com/feeds/health' },
      { name: 'Express Tribune Life', url: 'https://tribune.com.pk/feed/lifestyle' },
    ],
    science: [
      { name: 'Dawn Science',     url: 'https://www.dawn.com/feeds/science' },
      { name: 'Propakistani Tech',url: 'https://propakistani.pk/feed/' },
    ],
  },

  // ── India ───────────────────────────────────────────────────────────
  in: {
    general: [
      { name: 'NDTV',           url: 'https://feeds.feedburner.com/ndtvnews-top-stories' },
      { name: 'Times of India', url: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms' },
      { name: 'The Hindu',      url: 'https://www.thehindu.com/feeder/default.rss' },
      { name: 'India Today',    url: 'https://www.indiatoday.in/rss/home' },
      { name: 'Hindustan Times',url: 'https://www.hindustantimes.com/feeds/rss/topnews/rssfeed.xml' },
      { name: 'NDTV 24x7',      url: 'https://feeds.feedburner.com/ndtvnews-latest' },
    ],
    business: [
      { name: 'Economic Times',  url: 'https://economictimes.indiatimes.com/rssfeedsdefault.cms' },
      { name: 'Business Standard',url:'https://www.business-standard.com/rss/home_page_top_stories.rss' },
      { name: 'Mint',            url: 'https://www.livemint.com/rss/news' },
    ],
    sports: [
      { name: 'NDTV Sports',      url: 'https://feeds.feedburner.com/ndtvsports-cricket' },
      { name: 'Times Sports',     url: 'https://timesofindia.indiatimes.com/rss/4719148.cms' },
      { name: 'ESPN Cricinfo',    url: 'https://www.espncricinfo.com/rss/content/story/feeds/0.xml' },
    ],
    technology: [
      { name: 'NDTV Gadgets',   url: 'https://feeds.feedburner.com/gadgets360-latest' },
      { name: 'Times Tech',     url: 'https://timesofindia.indiatimes.com/rss/4719971.cms' },
    ],
    entertainment: [
      { name: 'Bollywood Hungama', url: 'https://www.bollywoodhungama.com/rss/news.xml' },
      { name: 'FilmFare',          url: 'https://www.filmfare.com/rss.xml' },
      { name: 'Times Entertainment',url:'https://timesofindia.indiatimes.com/rss/4719916.cms' },
    ],
    health: [
      { name: 'Times Health',   url: 'https://timesofindia.indiatimes.com/rss/4719955.cms' },
      { name: 'NDTV Health',    url: 'https://feeds.feedburner.com/ndtvnews-health' },
    ],
    science: [
      { name: 'NDTV Science',   url: 'https://feeds.feedburner.com/ndtvnews-science' },
      { name: 'The Hindu Sci',  url: 'https://www.thehindu.com/sci-tech/feeder/default.rss' },
    ],
  },

  // ── Palestine ───────────────────────────────────────────────────────
  ps: {
    general: [
      { name: 'Al Jazeera',     url: 'https://www.aljazeera.com/xml/rss/all.xml' },
      { name: 'Middle East Eye',url: 'https://www.middleeasteye.net/rss' },
      { name: 'Mondoweiss',     url: 'https://mondoweiss.net/feed/' },
      { name: 'Palestine Chronicle', url: 'https://www.palestinechronicle.com/feed/' },
      { name: 'Electronic Intifada', url: 'https://electronicintifada.net/rss.xml' },
    ],
    business: [
      { name: 'Al Jazeera Economy', url: 'https://www.aljazeera.com/xml/rss/economy.xml' },
      { name: 'Middle East Eye',    url: 'https://www.middleeasteye.net/rss' },
    ],
    sports: [
      { name: 'Al Jazeera Sport', url: 'https://www.aljazeera.com/xml/rss/sport.xml' },
    ],
    technology: [
      { name: 'Al Jazeera Tech', url: 'https://www.aljazeera.com/xml/rss/scitech.xml' },
    ],
    entertainment: [
      { name: 'Al Jazeera Arts', url: 'https://www.aljazeera.com/xml/rss/artsentertainment.xml' },
    ],
    health: [
      { name: 'Al Jazeera',      url: 'https://www.aljazeera.com/xml/rss/all.xml' },
    ],
    science: [
      { name: 'Al Jazeera Sci',  url: 'https://www.aljazeera.com/xml/rss/scitech.xml' },
    ],
  },

  // ── UAE ─────────────────────────────────────────────────────────────
  ae: {
    general: [
      { name: 'Gulf News',      url: 'https://gulfnews.com/rss' },
      { name: 'The National',   url: 'https://www.thenationalnews.com/rss' },
      { name: 'Khaleej Times',  url: 'https://www.khaleejtimes.com/rss' },
      { name: 'Al Arabiya',     url: 'https://english.alarabiya.net/tools/rss' },
      { name: 'Emirates 24/7',  url: 'https://www.emirates247.com/rss' },
    ],
    business: [
      { name: 'Gulf News Business', url: 'https://gulfnews.com/rss/business' },
      { name: 'The National Biz',   url: 'https://www.thenationalnews.com/business/rss' },
    ],
    sports: [
      { name: 'Gulf News Sports',   url: 'https://gulfnews.com/rss/sport' },
      { name: 'The National Sports',url: 'https://www.thenationalnews.com/sport/rss' },
    ],
    technology: [
      { name: 'Gulf News Tech',     url: 'https://gulfnews.com/rss/technology' },
      { name: 'The National Tech',  url: 'https://www.thenationalnews.com/technology/rss' },
    ],
    entertainment: [
      { name: 'Gulf News Entertain',url: 'https://gulfnews.com/rss/entertainment' },
    ],
    health: [
      { name: 'Gulf News Health',   url: 'https://gulfnews.com/rss/health' },
    ],
    science: [
      { name: 'The National Sci',   url: 'https://www.thenationalnews.com/uae/rss' },
    ],
  },

  // ── Germany ─────────────────────────────────────────────────────────
  de: {
    general: [
      { name: 'DW News',        url: 'https://rss.dw.com/rdf/rss-en-all' },
      { name: 'Der Spiegel',    url: 'https://www.spiegel.de/international/index.rss' },
      { name: 'Deutsche Welle', url: 'https://rss.dw.com/rdf/rss-en-top' },
    ],
    business: [
      { name: 'DW Business',    url: 'https://rss.dw.com/rdf/rss-en-bus' },
    ],
    sports: [
      { name: 'DW Sports',      url: 'https://rss.dw.com/rdf/rss-en-sport' },
    ],
    technology: [
      { name: 'DW Science',     url: 'https://rss.dw.com/rdf/rss-en-sci' },
    ],
    entertainment: [
      { name: 'DW Culture',     url: 'https://rss.dw.com/rdf/rss-en-cul' },
    ],
    health: [
      { name: 'DW News',        url: 'https://rss.dw.com/rdf/rss-en-all' },
    ],
    science: [
      { name: 'DW Science',     url: 'https://rss.dw.com/rdf/rss-en-sci' },
    ],
  },

  // ── France ──────────────────────────────────────────────────────────
  fr: {
    general: [
      { name: 'France 24',      url: 'https://www.france24.com/en/rss' },
      { name: 'RFI English',    url: 'https://www.rfi.fr/en/rss' },
      { name: 'Le Monde (EN)',  url: 'https://www.lemonde.fr/en/rss/une.xml' },
    ],
    business: [
      { name: 'France 24 Biz',  url: 'https://www.france24.com/en/economy/rss' },
    ],
    sports: [
      { name: 'France 24 Sport',url: 'https://www.france24.com/en/sports/rss' },
    ],
    technology: [
      { name: 'France 24 Tech', url: 'https://www.france24.com/en/technology/rss' },
    ],
    entertainment: [
      { name: 'France 24 Arts', url: 'https://www.france24.com/en/culture/rss' },
    ],
    health: [
      { name: 'France 24',      url: 'https://www.france24.com/en/rss' },
    ],
    science: [
      { name: 'France 24 Sci',  url: 'https://www.france24.com/en/science/rss' },
    ],
  },

  // ── Australia ───────────────────────────────────────────────────────
  au: {
    general: [
      { name: 'ABC News AU',    url: 'https://www.abc.net.au/news/feed/51120/rss.xml' },
      { name: 'The Guardian AU',url: 'https://www.theguardian.com/au/rss' },
      { name: 'Sydney Morning Herald', url: 'https://www.smh.com.au/rss/feed.xml' },
    ],
    business: [
      { name: 'ABC Business',   url: 'https://www.abc.net.au/news/feed/52278/rss.xml' },
    ],
    sports: [
      { name: 'ABC Sports',     url: 'https://www.abc.net.au/news/feed/52498/rss.xml' },
    ],
    technology: [
      { name: 'ABC Technology', url: 'https://www.abc.net.au/news/feed/52278/rss.xml' },
    ],
    entertainment: [
      { name: 'The Guardian Arts',url:'https://www.theguardian.com/artanddesign/rss' },
    ],
    health: [
      { name: 'ABC Health',     url: 'https://www.abc.net.au/news/feed/52176/rss.xml' },
    ],
    science: [
      { name: 'ABC Science',    url: 'https://www.abc.net.au/news/feed/52278/rss.xml' },
    ],
  },

  // ── Canada ──────────────────────────────────────────────────────────
  ca: {
    general: [
      { name: 'CBC News',       url: 'https://www.cbc.ca/cmlink/rss-topstories' },
      { name: 'CTV News',       url: 'https://www.ctvnews.ca/rss/ctvnews-ca-top-stories-public-rss-1.822009' },
      { name: 'Globe and Mail', url: 'https://www.theglobeandmail.com/arc/outboundfeeds/rss/category/canada/' },
      { name: 'National Post',  url: 'https://nationalpost.com/feed/' },
    ],
    business: [
      { name: 'CBC Business',   url: 'https://www.cbc.ca/cmlink/rss-business' },
      { name: 'Financial Post', url: 'https://financialpost.com/feed/' },
    ],
    sports: [
      { name: 'CBC Sports',     url: 'https://www.cbc.ca/cmlink/rss-sports' },
    ],
    technology: [
      { name: 'CBC Tech',       url: 'https://www.cbc.ca/cmlink/rss-technology' },
    ],
    entertainment: [
      { name: 'CBC Arts',       url: 'https://www.cbc.ca/cmlink/rss-arts' },
    ],
    health: [
      { name: 'CBC Health',     url: 'https://www.cbc.ca/cmlink/rss-health' },
    ],
    science: [
      { name: 'CBC Science',    url: 'https://www.cbc.ca/cmlink/rss-technology' },
    ],
  },

  // ── United Kingdom ──────────────────────────────────────────────────
  gb: {
    general: [
      { name: 'BBC News',       url: 'https://feeds.bbci.co.uk/news/rss.xml' },
      { name: 'The Guardian',   url: 'https://www.theguardian.com/uk/rss' },
      { name: 'Sky News',       url: 'https://feeds.skynews.com/feeds/rss/home.xml' },
      { name: 'The Independent',url: 'https://www.independent.co.uk/news/uk/rss' },
    ],
    business: [
      { name: 'BBC Business',   url: 'https://feeds.bbci.co.uk/news/business/rss.xml' },
      { name: 'Sky Business',   url: 'https://feeds.skynews.com/feeds/rss/business.xml' },
    ],
    sports: [
      { name: 'BBC Sport',      url: 'https://feeds.bbci.co.uk/sport/rss.xml' },
      { name: 'Sky Sports',     url: 'https://feeds.skynews.com/feeds/rss/sports.xml' },
    ],
    technology: [
      { name: 'BBC Technology', url: 'https://feeds.bbci.co.uk/news/technology/rss.xml' },
      { name: 'Sky Tech',       url: 'https://feeds.skynews.com/feeds/rss/technology.xml' },
    ],
    entertainment: [
      { name: 'BBC Entertainment',url:'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' },
    ],
    health: [
      { name: 'BBC Health',     url: 'https://feeds.bbci.co.uk/news/health/rss.xml' },
    ],
    science: [
      { name: 'BBC Science',    url: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
    ],
  },

  // ── United States ───────────────────────────────────────────────────
  us: {
    general: [
      { name: 'CNN',            url: 'http://rss.cnn.com/rss/cnn_topstories.rss' },
      { name: 'NBC News',       url: 'https://feeds.nbcnews.com/nbcnews/public/news' },
      { name: 'Fox News',       url: 'https://moxie.foxnews.com/google-publisher/latest.xml' },
      { name: 'NPR',            url: 'https://feeds.npr.org/1001/rss.xml' },
      { name: 'ABC News',       url: 'https://abcnews.go.com/abcnews/topstories' },
      { name: 'USA Today',      url: 'https://rssfeeds.usatoday.com/usatoday-NewsTopStories' },
    ],
    business: [
      { name: 'CNN Business',   url: 'http://rss.cnn.com/rss/money_latest.rss' },
      { name: 'Forbes',         url: 'https://www.forbes.com/business/feed/' },
      { name: 'CNBC',           url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html' },
    ],
    sports: [
      { name: 'ESPN',           url: 'https://www.espn.com/espn/rss/news' },
      { name: 'CBS Sports',     url: 'https://www.cbssports.com/rss/headlines/' },
      { name: 'NBC Sports',     url: 'https://feeds.nbcnews.com/nbcnews/public/sports' },
    ],
    technology: [
      { name: 'TechCrunch',     url: 'https://techcrunch.com/feed/' },
      { name: 'The Verge',      url: 'https://www.theverge.com/rss/index.xml' },
      { name: 'Wired',          url: 'https://www.wired.com/feed/rss' },
    ],
    entertainment: [
      { name: 'Entertainment Weekly', url: 'https://feeds.feedburner.com/entertainmentweekly/news' },
      { name: 'Variety',        url: 'https://variety.com/feed/' },
      { name: 'Hollywood Reporter', url: 'https://www.hollywoodreporter.com/feed/' },
    ],
    health: [
      { name: 'WebMD',          url: 'https://rssfeeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC' },
      { name: 'Healthline',     url: 'https://www.healthline.com/rss/health-news' },
      { name: 'Medical News Today', url: 'https://www.medicalnewstoday.com/rss' },
    ],
    science: [
      { name: 'Science Daily',  url: 'https://www.sciencedaily.com/rss/all.xml' },
      { name: 'NASA',           url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
      { name: 'New Scientist',  url: 'https://www.newscientist.com/feed/home/' },
    ],
  },

};

module.exports = RSS_FEEDS;
