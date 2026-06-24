import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('nm_token') || null);
  const [loading, setLoading] = useState(true);
  const [savedArticleUrls, setSavedArticleUrls] = useState(new Set());

  // Set axios default auth header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) { setLoading(false); return; }
      try {
        const { data } = await axios.get('/api/auth/me');
        setUser(data.user);
        fetchSavedUrls();
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const fetchSavedUrls = useCallback(async () => {
    try {
      const { data } = await axios.get('/api/saved');
      setSavedArticleUrls(new Set(data.articles.map((a) => a.newsUrl)));
    } catch { /* ignore */ }
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('nm_token', data.token);
    setToken(data.token);
    setUser(data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    fetchSavedUrls();
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await axios.post('/api/auth/register', { name, email, password });
    localStorage.setItem('nm_token', data.token);
    setToken(data.token);
    setUser(data.user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    return data;
  };

  const logout = () => {
    localStorage.removeItem('nm_token');
    setToken(null);
    setUser(null);
    setSavedArticleUrls(new Set());
    delete axios.defaults.headers.common['Authorization'];
  };

  const addSavedUrl = (url) => setSavedArticleUrls((prev) => new Set([...prev, url]));
  const removeSavedUrl = (url) =>
    setSavedArticleUrls((prev) => { const s = new Set(prev); s.delete(url); return s; });

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout, savedArticleUrls, addSavedUrl, removeSavedUrl, fetchSavedUrls }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
