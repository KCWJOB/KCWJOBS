import { Link } from 'react-router-dom';
import { FaHome, FaBell } from 'react-icons/fa';

const Header = () => {
  const navLinkStyle = {
    color: 'var(--color-text)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1.25rem',
    borderRadius: '999px',
    transition: 'background 0.3s ease, transform 0.3s ease',
    fontWeight: 600
  };

  const handleHover = (event, isEntering) => {
    event.currentTarget.style.background = isEntering ? 'rgba(37, 99, 235, 0.12)' : 'transparent';
    event.currentTarget.style.transform = isEntering ? 'translateY(-2px)' : 'none';
  };

  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.9)',
      color: 'var(--color-text)',
      padding: '1rem 0',
      boxShadow: '0 12px 30px rgba(15, 23, 42, 0.08)',
      borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 999,
      backdropFilter: 'blur(12px)'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <FaBell />
            Sarkari Result Portal
          </Link>
          
          <nav style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <style>
              {`
                @media (max-width: 768px) {
                  nav {
                    gap: 1rem !important;
                  }
                }
              `}
            </style>
            <Link
              to="/"
              style={navLinkStyle}
              onMouseEnter={(event) => handleHover(event, true)}
              onMouseLeave={(event) => handleHover(event, false)}
            >
              <FaHome />
              Home
            </Link>
            

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;