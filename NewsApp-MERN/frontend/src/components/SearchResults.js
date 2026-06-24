import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';
import NewsItem from './NewsItem';
import Footer from './Footer';

const SearchResults = ({ setProgress }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      setArticles([]);
      setPage(1);
      fetchResults(1, false, query);
    }
    // eslint-disable-next-line
  }, [query]);

  const fetchResults = async (pageNo, append, q) => {
    setProgress(10);
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/api/news/search', {
        params: { q: q || query, page: pageNo, pageSize: 9 },
      });
      setProgress(70);
      setArticles((prev) =>
        append ? prev.concat(data.articles || []) : data.articles || []
      );
      setTotalResults(data.totalResults || 0);
      setPage(pageNo);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const fetchMore = () => fetchResults(page + 1, true);

  return (
    <div className="nm-page-wrapper page-transition">
      <div className="nm-search-wrap">
        <div className="nm-search-header">
          <p className="nm-search-label">Search Results</p>
          <h1 className="nm-search-query">
            "<span>{query}</span>"
          </h1>
          {!loading && (
            <p className="nm-search-count">{totalResults} article{totalResults !== 1 ? 's' : ''} found</p>
          )}
        </div>

        {error && <div className="nm-alert">⚠️ {error}</div>}

        {loading && articles.length === 0 ? (
          <Spinner />
        ) : articles.length === 0 && !loading ? (
          <div className="nm-empty-state">
            <span className="nm-empty-icon">🔍</span>
            <p className="nm-empty-text">No results found for "{query}"</p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMore}
            hasMore={articles.length < totalResults}
            loader={<Spinner />}
            endMessage={
              <p className="nm-end-msg">All results shown.</p>
            }
          >
            <div className="nm-news-grid">
              {articles.map((a, i) => (
                <NewsItem
                  key={`${a.url}-${i}`}
                  title={a.title}
                  description={a.description}
                  imageUrl={a.urlToImage}
                  newsUrl={a.url}
                  author={a.author}
                  date={a.publishedAt}
                  source={a.source?.name}
                  category="search"
                />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
