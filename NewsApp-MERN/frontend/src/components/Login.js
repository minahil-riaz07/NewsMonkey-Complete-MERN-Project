import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Footer from './Footer';

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nm-page-wrapper page-transition">
      <div className="nm-split">
        {/* Left branding panel */}
        <div className="nm-split-left">
          <p className="nm-split-logo">NewsMonkey</p>
          <p className="nm-split-tagline">Stay informed. Stay ahead.</p>
          <div className="nm-split-features">
            <div className="nm-split-feature">
              <span className="nm-split-feature-icon"><CheckIcon /></span>
              <span>Real-time headlines from trusted global sources</span>
            </div>
            <div className="nm-split-feature">
              <span className="nm-split-feature-icon"><CheckIcon /></span>
              <span>Save and organize articles across every category</span>
            </div>
            <div className="nm-split-feature">
              <span className="nm-split-feature-icon"><CheckIcon /></span>
              <span>Personalized news feed based on your interests</span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="nm-split-right">
          <div className="nm-form-wrap">
            <h2 className="nm-form-title">Sign In</h2>
            <p className="nm-form-subtitle">Welcome back — enter your credentials to continue.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="nm-form-group">
                <label className="nm-form-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="nm-form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="nm-form-group">
                <label className="nm-form-label" htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="nm-form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="nm-btn-submit" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '16px', height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'nmSpin 0.8s linear infinite',
                      display: 'inline-block',
                    }} />
                    Signing in…
                  </span>
                ) : 'Sign In'}
              </button>
            </form>

            <p className="nm-form-footer">
              Don't have an account?{' '}
              <Link to="/register" className="nm-link">Create one →</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
