import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useCountry } from '../context/CountryContext';

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const CATEGORIES = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { currentCountry, changeCountry, COUNTRIES } = useCountry();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const handleCountrySelect = (code) => {
    changeCountry(code);
    setDropdownOpen(false);
    // No navigate needed — AppRoutes uses key={country-category} which
    // remounts the News component automatically when country changes.
  };

  return (
    <>
      <nav className="nm-navbar">
        <div className="nm-navbar-inner">
          <Link className="nm-brand" to="/" onClick={() => setMobileOpen(false)}>
            <span className="nm-brand-icon">📰</span>
            <span className="nm-brand-news">News</span><span className="nm-brand-monkey">Monkey</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="nm-nav-links">
            <li><Link className="nm-nav-link" to="/">Home</Link></li>
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <Link className="nm-nav-link" to={`/${cat.toLowerCase()}`}>{cat}</Link>
              </li>
            ))}
            {user && (
              <li><Link className="nm-nav-link" to="/saved">Saved</Link></li>
            )}
          </ul>

          {/* Search */}
          <form className="nm-search-form" onSubmit={handleSearch}>
            <input
              className="nm-search-input"
              type="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
            />
            <button className="nm-search-btn" type="submit" aria-label="Submit search">
              <SearchIcon />
            </button>
          </form>

          {/* Right actions */}
          <div className="nm-nav-actions">

            {/* ── Country Dropdown ── */}
            <div className="nm-country-dropdown" ref={dropdownRef}>
              <button
                className="nm-country-trigger"
                onClick={() => setDropdownOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                title="Select country"
              >
                <GlobeIcon />
                <span className="nm-country-flag">{currentCountry.flag}</span>
                <span className="nm-country-name">{currentCountry.name}</span>
                <span className={`nm-country-chevron${dropdownOpen ? ' open' : ''}`}>
                  <ChevronIcon />
                </span>
              </button>

              {dropdownOpen && (
                <ul className="nm-country-menu" role="listbox" aria-label="Select country">
                  {COUNTRIES.map((c) => (
                    <li
                      key={c.code}
                      role="option"
                      aria-selected={c.code === currentCountry.code}
                      className={`nm-country-option${c.code === currentCountry.code ? ' active' : ''}`}
                      onClick={() => handleCountrySelect(c.code)}
                    >
                      <span className="nm-country-option-flag">{c.flag}</span>
                      <span className="nm-country-option-name">{c.name}</span>
                      {c.code === currentCountry.code && (
                        <span className="nm-country-check">✓</span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button className="nm-theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>

            {user ? (
              <>
                <Link to="/profile" className="nm-btn-ghost">
                  {user.name.split(' ')[0]}
                </Link>
                <button className="nm-btn-crimson" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nm-btn-ghost">Login</Link>
                <Link to="/register" className="nm-btn-crimson">Register</Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nm-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`nm-mobile-menu${mobileOpen ? ' open' : ''}`}>
        <Link className="nm-mobile-link" to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            className="nm-mobile-link"
            to={`/${cat.toLowerCase()}`}
            onClick={() => setMobileOpen(false)}
          >
            {cat}
          </Link>
        ))}
        {user && (
          <Link className="nm-mobile-link" to="/saved" onClick={() => setMobileOpen(false)}>Saved</Link>
        )}

        {/* Mobile country picker */}
        <div style={{ padding: '12px 0 4px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Select Country
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {COUNTRIES.map((c) => (
              <button
                key={c.code}
                onClick={() => { handleCountrySelect(c.code); setMobileOpen(false); }}
                style={{
                  background: c.code === currentCountry.code ? 'var(--accent)' : 'transparent',
                  border: `1px solid ${c.code === currentCountry.code ? 'var(--accent)' : 'var(--input-border)'}`,
                  color: c.code === currentCountry.code ? 'white' : 'var(--text-secondary)',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {c.flag} {c.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', padding: '12px 0' }}>
          <input
            className="nm-form-input"
            type="search"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ height: '40px' }}
          />
          <button className="nm-btn-crimson" type="submit">Go</button>
        </form>

        <div className="nm-mobile-actions">
          <button className="nm-theme-btn" onClick={() => { toggleTheme(); setMobileOpen(false); }}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
          {user ? (
            <button className="nm-btn-crimson" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="nm-btn-ghost" onClick={() => setMobileOpen(false)}>Login</Link>
              <Link to="/register" className="nm-btn-crimson" onClick={() => setMobileOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
