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

const getPasswordStrength = (pw) => {
  if (!pw) return null;
  const hasUpper = /[A-Z]/.test(pw);
  const hasNum = /\d/.test(pw);
  const hasSpecial = /[^A-Za-z0-9]/.test(pw);
  const score = [pw.length >= 8, hasUpper, hasNum, hasSpecial].filter(Boolean).length;
  if (score <= 1) return 'weak';
  if (score <= 3) return 'medium';
  return 'strong';
};

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const strength = getPasswordStrength(form.password);
  const strengthLabels = { weak: 'Weak', medium: 'Medium', strong: 'Strong' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
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
            <h2 className="nm-form-title">Create Account</h2>
            <p className="nm-form-subtitle">Join thousands of readers staying ahead of the news.</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="nm-form-group">
                <label className="nm-form-label" htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  name="name"
                  className="nm-form-input"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>

              <div className="nm-form-group">
                <label className="nm-form-label" htmlFor="reg-email">Email Address</label>
                <input
                  id="reg-email"
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
                <label className="nm-form-label" htmlFor="reg-pw">Password</label>
                <input
                  id="reg-pw"
                  type="password"
                  name="password"
                  className="nm-form-input"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                {strength && (
                  <>
                    <div className="nm-pw-meter">
                      <div className={`nm-pw-bar ${strength}`} />
                    </div>
                    <p className={`nm-pw-label ${strength}`}>{strengthLabels[strength]}</p>
                  </>
                )}
              </div>

              <div className="nm-form-group">
                <label className="nm-form-label" htmlFor="reg-confirm">Confirm Password</label>
                <input
                  id="reg-confirm"
                  type="password"
                  name="confirmPassword"
                  className="nm-form-input"
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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
                    Creating account…
                  </span>
                ) : 'Create Account'}
              </button>
            </form>

            <p className="nm-form-footer">
              Already have an account?{' '}
              <Link to="/login" className="nm-link">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
