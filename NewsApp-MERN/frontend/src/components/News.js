import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import Footer from './Footer';
import { COUNTRIES } from '../context/CountryContext';

const DEFAULT_HERO_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80';

class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 9,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
  };

  capitalizeFirstLetter = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: true,
      totalResults: 0,
      error: null,
    };
    document.title = `${this.capitalizeFirstLetter(props.category)} – NewsMonkey`;
  }

  fetchNews = async (page = 1, append = false) => {
    const { country, category, pageSize, setProgress } = this.props;
    setProgress(10);
    this.setState({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/news/top-headlines', {
        params: { country, category, page, pageSize },
      });
      setProgress(70);
      this.setState((prev) => ({
        articles: append
          ? prev.articles.concat(data.articles || [])
          : data.articles || [],
        totalResults: data.totalResults || 0,
        page,
        loading: false,
      }));
    } catch (err) {
      this.setState({
        error: err.response?.data?.message || 'Failed to load news. Please try again.',
        loading: false,
      });
    }
    setProgress(100);
  };

  async componentDidMount() {
    this.fetchNews(1);
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.country  !== this.props.country
    ) {
      document.title = `${this.capitalizeFirstLetter(this.props.category)} – NewsMonkey`;
      // Reset and re-fetch — covers cases where key remount didn't fire
      this.setState({ articles: [], page: 1, totalResults: 0, error: null }, () => {
        this.fetchNews(1);
      });
    }
  }

  fetchMoreData = () => {
    this.fetchNews(this.state.page + 1, true);
  };

  render() {
    const { articles, loading, error, totalResults } = this.state;
    const { category, country } = this.props;
    const cap = this.capitalizeFirstLetter;
    const isGeneral = category === 'general';

    const countryInfo = COUNTRIES.find((c) => c.code === country) || { flag: '🌐', name: country.toUpperCase() };

    // First article is the hero (general page only)
    const heroArticle = isGeneral && articles.length > 0 ? articles[0] : null;
    const gridArticles = isGeneral && heroArticle ? articles.slice(1) : articles;

    return (
      <div className="nm-page-wrapper page-transition">

        {/* Country Banner */}
        <div className="nm-country-banner">
          <span className="nm-country-banner-flag">{countryInfo.flag}</span>
          <span>Showing top headlines from <strong>{countryInfo.name}</strong></span>
        </div>
        {/* Editorial Hero — general category only */}
        {isGeneral && (
          heroArticle ? (
            <a
              className="nm-hero"
              href={heroArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundImage: `url(${heroArticle.urlToImage || DEFAULT_HERO_IMG})`,
              }}
              aria-label={heroArticle.title}
            >
              <div className="nm-hero-content">
                <div className="nm-hero-badges">
                  {heroArticle.source?.name && (
                    <span className="nm-hero-source">{heroArticle.source.name}</span>
                  )}
                  <span className="nm-hero-category">{cap(category)}</span>
                </div>
                <h1 className="nm-hero-headline">{heroArticle.title}</h1>
                {heroArticle.description && (
                  <p className="nm-hero-desc">{heroArticle.description}</p>
                )}
                <p className="nm-hero-meta">
                  {heroArticle.author ? `By ${heroArticle.author}` : ''}
                  {heroArticle.author && heroArticle.publishedAt ? ' · ' : ''}
                  {heroArticle.publishedAt
                    ? new Date(heroArticle.publishedAt).toLocaleDateString('en-US', {
                        day: 'numeric', month: 'long', year: 'numeric',
                      })
                    : ''}
                </p>
                <span className="nm-hero-btn">Read Story →</span>
              </div>
            </a>
          ) : loading ? null : null
        )}

        {/* Category Hero — non-general pages */}
        {!isGeneral && (
          <div className="nm-category-hero">
            <div className="nm-container">
              <h1 className="nm-category-title">{cap(category)}</h1>
              <p className="nm-category-subtitle">
                Latest {cap(category)} headlines from {countryInfo.flag} {countryInfo.name}
              </p>
            </div>
          </div>
        )}

        <div className="nm-container">
          {error && <div className="nm-alert">⚠️ {error}</div>}

          {loading && articles.length === 0 ? (
            <Spinner />
          ) : (
            <InfiniteScroll
              dataLength={articles.length}
              next={this.fetchMoreData}
              hasMore={articles.length < totalResults}
              loader={<Spinner />}
              endMessage={
                articles.length > 0 && (
                  <p className="nm-end-msg">
                    ✓ You've read all {totalResults} articles.
                  </p>
                )
              }
            >
              <div className="nm-news-grid">
                {gridArticles.map((article, index) => (
                  <NewsItem
                    key={`${article.url}-${index}`}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                    author={article.author}
                    date={article.publishedAt}
                    source={article.source?.name}
                    category={category}
                  />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>

        <Footer />
      </div>
    );
  }
}

export default News;
