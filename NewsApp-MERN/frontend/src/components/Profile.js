import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const CATEGORIES = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [prefs, setPrefs] = useState(user?.preferredCategories || ['general']);
  const [saving, setSaving] = useState(false);

  const togglePref = (cat) => {
    setPrefs((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put('/api/auth/profile', { name, preferredCategories: prefs });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info('Logged out');
  };

  if (!user) { navigate('/login'); return null; }

  return (
    <div className="nm-page-wrapper page-transition">
      <div className="nm-profile-wrap">
        <div className="nm-profile-card">
          {/* Avatar */}
          <div className="nm-avatar" aria-hidden="true">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="nm-profile-name">{user.name}</h2>
          <p className="nm-profile-email">{user.email}</p>

          <form onSubmit={handleSave}>
            <div className="nm-form-group">
              <label className="nm-form-label" htmlFor="profile-name">Display Name</label>
              <input
                id="profile-name"
                type="text"
                className="nm-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="nm-form-group">
              <label className="nm-form-label">Preferred Categories</label>
              <div className="nm-pref-tags">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`nm-pref-tag${prefs.includes(cat) ? ' active' : ''}`}
                    onClick={() => togglePref(cat)}
                    aria-pressed={prefs.includes(cat)}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="nm-btn-submit" disabled={saving}>
              {saving ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px', height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'nmSpin 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                  Saving…
                </span>
              ) : 'Save Changes'}
            </button>
          </form>

          <hr className="nm-divider" />

          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/saved" className="nm-btn-secondary">
              🔖 Saved Articles
            </Link>
            <button className="nm-btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
