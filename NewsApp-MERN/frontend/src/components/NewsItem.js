import React from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80';

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, category }) => {
  const { user, savedArticleUrls, addSavedUrl, removeSavedUrl } = useAuth();
  const isSaved = savedArticleUrls.has(newsUrl);

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  const handleSaveToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info('Please login to save articles');
      return;
    }
    try {
      if (isSaved) {
        const { data: savedData } = await api.get('/api/saved');
        const match = savedData.articles.find((a) => a.newsUrl === newsUrl);
        if (match) {
          await api.delete(`/api/saved/${match._id}`);
          removeSavedUrl(newsUrl);
          toast.success('Removed from saved');
        }
      } else {
        await api.post('/api/saved', {
          title,
          description,
          imageUrl,
          newsUrl,
          author: author || 'Unknown',
          source,
          category,
          publishedAt: date,
        });
        addSavedUrl(newsUrl);
        toast.success('Article saved!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <a
      className="nm-card"
      href={newsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
    >
      <div className="nm-card-img-wrap">
        <img
          className="nm-card-img"
          src={imageUrl || DEFAULT_IMG}
          alt={title || 'News'}
          onError={(e) => { e.target.src = DEFAULT_IMG; }}
          loading="lazy"
        />
        {source && (
          <span className="nm-card-source" title={source}>{source}</span>
        )}
      </div>

      <div className="nm-card-body">
        <h3 className="nm-card-title">{title || 'No Title'}</h3>
        <p className="nm-card-desc">
          {description ? description.slice(0, 130) : 'No description available.'}
        </p>
        <div className="nm-card-footer">
          <div className="nm-card-meta">
            {author && <span>By {author}</span>}
            {author && formattedDate && <span> · </span>}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
          <button
            className={`nm-save-btn${isSaved ? ' saved' : ''}`}
            onClick={handleSaveToggle}
            title={isSaved ? 'Remove from saved' : 'Save article'}
            aria-label={isSaved ? 'Remove from saved' : 'Save article'}
          >
            <HeartIcon filled={isSaved} />
          </button>
        </div>
      </div>
    </a>
  );
};

export default NewsItem;
