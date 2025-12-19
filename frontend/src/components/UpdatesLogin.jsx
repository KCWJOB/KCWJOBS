import { useState } from 'react';
import { FaBell, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';

const UpdatesLogin = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    setMessage('✅ Successfully subscribed to updates! You will receive notifications for new jobs, results, and admit cards.');
    setTimeout(() => {
      setMessage('');
      setShowModal(false);
      setFormData({ email: '', password: '' });
    }, 3000);
  };

  return (
    <>
      <section style={{
        padding: '3.5rem 0',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '20px',
        margin: '2.5rem 0',
        textAlign: 'center',
        boxShadow: 'var(--shadow-soft)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <FaBell size={32} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'var(--color-text)',
              margin: 0
            }}>
              Get Latest Updates
            </h2>
          </div>
          
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--color-muted)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Want instant notifications for new jobs, results, and admit cards? 
            Login to get real-time updates directly to your email!
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
              style={{
                fontSize: '1.125rem',
                padding: '12px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <FaEnvelope />
              Subscribe to Updates
            </button>
            
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#047857',
              padding: '12px 24px',
              borderRadius: '999px',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              📱 Free SMS & Email Alerts
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--color-surface)',
            borderRadius: '16px',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              <FaTimes />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <FaBell size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--color-text)',
                marginBottom: '0.5rem'
              }}>
                Subscribe to Updates
              </h2>
              <p style={{ color: '#6b7280' }}>
                Get notified instantly when new content is uploaded
              </p>
            </div>

            {message && (
              <div style={{
                background: '#dcfce7',
                color: '#166534',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1.5rem',
                textAlign: 'center',
                fontSize: '0.875rem'
              }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--color-text)'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                  color: 'var(--color-text)'
                }}>
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                  placeholder="Create a password"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '10px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
              >
                Subscribe Now
              </button>
            </form>

            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--color-surface-muted)',
              borderRadius: '10px',
              fontSize: '0.75rem',
              color: 'var(--color-muted)',
              textAlign: 'center'
            }}>
              🔒 Your information is secure and will only be used for job notifications
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatesLogin;