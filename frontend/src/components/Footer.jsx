const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--color-bg-strong) 0%, var(--color-surface) 100%)',
      color: 'var(--color-text)',
      padding: '3rem 0',
      marginTop: '4rem',
      borderTop: '1px solid var(--color-border)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', color: 'var(--color-text)' }}>Sarkari Result Portal</h3>
            <p style={{ color: 'var(--color-muted)', lineHeight: '1.7' }}>
              Your trusted source for government job notifications, results, and admit cards. 
              Stay updated with the latest opportunities in the public sector.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/category/upcoming-job" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                  Latest Jobs
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/category/result" style={{ color: '#0f172a', textDecoration: 'none' }}>
                  Results
                </a>
              </li>
              <li style={{ marginBottom: '0.5rem' }}>
                <a href="/category/admit-card" style={{ color: '#0f172a', textDecoration: 'none' }}>
                  Admit Cards
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)' }}>Contact Info</h4>
            <p style={{ color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
              Email: info@sarkariresult.com
            </p>
            <p style={{ color: 'var(--color-muted)' }}>
              Phone: +91 12345 67890
            </p>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1rem',
          textAlign: 'center',
          color: 'var(--color-muted)'
        }}>
          <p>&copy; 2024 Sarkari Result Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;