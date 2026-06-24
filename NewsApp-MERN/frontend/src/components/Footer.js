import React from 'react';
import { Link } from 'react-router-dom';

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CATEGORIES = ['Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="nm-footer">
      <div className="nm-footer-inner">
        <div className="nm-footer-grid">
          {/* Column 1 – Brand */}
          <div>
            <p className="nm-footer-brand-name">NewsMonkey</p>
            <p className="nm-footer-tagline">
              Your trusted source for breaking news, in-depth analysis, and expert perspectives from around the world.
            </p>
            <div className="nm-footer-socials">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nm-social-icon"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nm-social-icon"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nm-social-icon"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Column 2 – Quick Links */}
          <div>
            <h3 className="nm-footer-section-title">Quick Links</h3>
            <ul className="nm-footer-links">
              <li><Link className="nm-footer-link" to="/">Home</Link></li>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link className="nm-footer-link" to={`/${cat.toLowerCase()}`}>{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 – About */}
          <div>
            <h3 className="nm-footer-section-title">About</h3>
            <p className="nm-footer-about-text">
              NewsMonkey is a MERN-stack news aggregator delivering real-time headlines across every major category. Built for curious, informed readers.
            </p>
            <a href="mailto:contact@newsmonkey.com" className="nm-footer-link">
              Contact Us →
            </a>
          </div>
        </div>

        <div className="nm-footer-bottom">
          <span className="nm-footer-copy">
            © {year} NewsMonkey. All rights reserved.
          </span>
          <span className="nm-footer-copy">
            Designed &amp; developed by{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Minahil Riaz</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
