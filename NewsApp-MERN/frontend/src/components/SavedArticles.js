import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';
import Footer from './Footer';

const DEFAULT_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80';

const TrashIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
  </svg>
);

const CommentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const SavedArticles = () => {
  const { user, removeSavedUrl } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchSaved();
    // eslint-disable-next-line
  }, [user]);

  const fetchSaved = async () => {
    try {
      const { data } = await api.get('/api/saved');
      setArticles(data.articles);
    } catch {
      toast.error('Failed to load saved articles');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id, url) => {
    try {
      await api.delete(`/api/saved/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
      removeSavedUrl(url);
      toast.success('Article removed');
    } catch {
      toast.error('Failed to remove article');
    }
  };

  const handleAddComment = async (articleId) => {
    const text = commentText[articleId]?.trim();
    if (!text) return;
    try {
      const { data } = await api.post(`/api/saved/${articleId}/comments`, { text });
      setArticles((prev) =>
        prev.map((a) => (a._id === articleId ? { ...a, comments: data.comments } : a))
      );
      setCommentText((prev) => ({ ...prev, [articleId]: '' }));
      toast.success('Comment added');
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleDeleteComment = async (articleId, commentId) => {
    try {
      const { data } = await api.delete(`/api/saved/${articleId}/comments/${commentId}`);
      setArticles((prev) =>
        prev.map((a) => (a._id === articleId ? { ...a, comments: data.comments } : a))
      );
    } catch {
      toast.error('Failed to delete comment');
    }
  };

  if (loading) return <div className="nm-page-wrapper"><Spinner /></div>;

  return (
    <div className="nm-page-wrapper page-transition">
      <div className="nm-saved-wrap">
        <h1 className="nm-section-title">Saved Articles</h1>
        <p className="nm-section-subtitle">{articles.length} article{articles.length !== 1 ? 's' : ''} saved</p>

        {articles.length === 0 ? (
          <div className="nm-empty-state">
            <span className="nm-empty-icon">🔖</span>
            <p className="nm-empty-text">No saved articles yet.</p>
            <Link to="/" className="nm-btn-outline">Browse News</Link>
          </div>
        ) : (
          <div className="nm-saved-grid">
            {articles.map((article) => (
              <div className="nm-saved-card" key={article._id}>
                <img
                  className="nm-saved-card-img"
                  src={article.imageUrl || DEFAULT_IMG}
                  alt={article.title}
                  onError={(e) => { e.target.src = DEFAULT_IMG; }}
                  loading="lazy"
                />
                <div className="nm-saved-card-body">
                  {article.source && (
                    <span className="nm-saved-card-source">{article.source}</span>
                  )}
                  <h3 className="nm-saved-card-title">{article.title}</h3>
                  <p className="nm-saved-card-desc">
                    {article.description?.slice(0, 110)}
                  </p>
                  <div className="nm-saved-actions">
                    <a
                      href={article.newsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nm-btn-read"
                    >
                      Read →
                    </a>
                    <button
                      className="nm-btn-icon"
                      onClick={() => setExpandedId(expandedId === article._id ? null : article._id)}
                      title="Comments"
                      aria-label="Toggle comments"
                    >
                      <CommentIcon />
                      <span style={{ fontSize: '11px', marginLeft: '3px' }}>{article.comments?.length || 0}</span>
                    </button>
                    <button
                      className="nm-btn-icon"
                      onClick={() => handleRemove(article._id, article.newsUrl)}
                      title="Remove article"
                      aria-label="Remove article"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  {expandedId === article._id && (
                    <div className="nm-comments-section">
                      {article.comments?.length > 0 ? (
                        article.comments.map((c) => (
                          <div key={c._id} className="nm-comment-item">
                            <div>
                              <span className="nm-comment-name">{c.name}: </span>
                              <span className="nm-comment-text">{c.text}</span>
                            </div>
                            {c.user === user?._id && (
                              <button
                                className="nm-comment-del"
                                onClick={() => handleDeleteComment(article._id, c._id)}
                                aria-label="Delete comment"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))
                      ) : (
                        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                          No comments yet.
                        </p>
                      )}
                      <div className="nm-comment-input-row">
                        <input
                          type="text"
                          className="nm-comment-input"
                          placeholder="Add a comment…"
                          value={commentText[article._id] || ''}
                          onChange={(e) =>
                            setCommentText((prev) => ({ ...prev, [article._id]: e.target.value }))
                          }
                          onKeyDown={(e) => e.key === 'Enter' && handleAddComment(article._id)}
                        />
                        <button
                          className="nm-comment-post"
                          onClick={() => handleAddComment(article._id)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SavedArticles;
