import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { sessionManager } from '../utils/sessionManager';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const navigate = useNavigate();

  // Theme synchronization - Force dark theme for admin login
  useEffect(() => {
    // Check if already logged in
    if (sessionManager.isAuthenticated()) {
      navigate('/admin/dashboard');
      return;
    }

    // Always use dark theme for admin login
    setIsDarkTheme(true);
    
    // Apply dark theme to body for this page
    document.body.classList.add('dark-theme');
    
    // Cleanup when component unmounts
    return () => {
      // Restore original theme when leaving admin login
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme !== 'dark') {
        document.body.classList.remove('dark-theme');
      }
    };
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token, admin, expiresIn } = response.data;
      
      // Store token with expiration
      const expirationTime = Date.now() + (expiresIn * 1000); // Convert to milliseconds
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUser', JSON.stringify(admin));
      localStorage.setItem('adminTokenExpiry', expirationTime.toString());
      
      navigate('/admin/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg)',
      padding: 'var(--spacing-md)'
    }}>
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: 'clamp(12px, 2vw, 20px)',
        padding: 'var(--spacing-lg)',
        boxShadow: 'var(--shadow-soft)',
        border: '1px solid var(--color-border)',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
          <h1 style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: '700',
            color: isDarkTheme ? '#ffffff' : '#000000',
            marginBottom: 'var(--spacing-xs)'
          }}>
            Admin Login
          </h1>
          <p style={{ 
            color: isDarkTheme ? '#cbd5e1' : '#000000',
            fontSize: 'var(--font-size-sm)'
          }}>
            Access the admin dashboard
          </p>
        </div>

        {error && (
          <div style={{
            background: isDarkTheme ? '#7f1d1d' : '#fee2e2',
            color: isDarkTheme ? '#fecaca' : '#dc2626',
            padding: 'var(--spacing-sm)',
            borderRadius: '8px',
            marginBottom: 'var(--spacing-md)',
            textAlign: 'center',
            fontSize: 'var(--font-size-sm)',
            border: isDarkTheme ? '1px solid #991b1b' : '1px solid #fecaca'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--spacing-md)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600',
              color: isDarkTheme ? '#ffffff' : '#000000',
              fontSize: 'var(--font-size-sm)'
            }}>
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              required
              style={{
                width: '100%',
                padding: 'var(--spacing-sm)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                fontSize: 'var(--font-size-base)',
                outline: 'none',
                transition: 'border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease',
                boxSizing: 'border-box',
                background: 'var(--color-surface)',
                color: isDarkTheme ? '#ffffff' : '#000000'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-primary)';
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label style={{
              display: 'block',
              marginBottom: 'var(--spacing-xs)',
              fontWeight: '600',
              color: isDarkTheme ? '#ffffff' : '#000000',
              fontSize: 'var(--font-size-sm)'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
                style={{
                  width: '100%',
                  padding: 'var(--spacing-sm)',
                  paddingRight: 'clamp(40px, 10vw, 48px)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: 'var(--font-size-base)',
                  outline: 'none',
                  transition: 'border-color var(--transition-speed) ease, box-shadow var(--transition-speed) ease',
                  boxSizing: 'border-box',
                  background: 'var(--color-surface)',
                  color: isDarkTheme ? '#ffffff' : '#000000'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-primary)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 'var(--spacing-sm)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'color var(--transition-speed) ease'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--color-text)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-muted)'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: 'var(--spacing-sm)',
              fontSize: 'var(--font-size-base)',
              fontWeight: '600',
              minHeight: 'clamp(44px, 8vw, 52px)',
              borderRadius: '8px',
              transition: 'all var(--transition-speed) ease'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;