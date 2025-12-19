import { useState, useEffect } from 'react';

const Advertisement = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  
  const advertisements = [
    {
      title: "SaralWorks Pvt. Ltd.",
      description: "Leading technology solutions for government and enterprise applications",
      contact: "info@saralworks.com | +91-1234567890",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      title: "Kasim Cyber Cafe",
      description: "Complete computer services, internet facility and digital solutions in Sasaram, Bihar",
      contact: "kasimcyber@gmail.com | +91-9876543210",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      title: "Web Development Services",
      description: "Professional web applications and government portals with latest technology",
      contact: "web@saralworks.com | +91-8765432109",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      title: "Mobile App Development",
      description: "iOS and Android applications for business and government sectors",
      contact: "mobile@saralworks.com | +91-7654321098",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % advertisements.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [advertisements.length]);

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % advertisements.length);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + advertisements.length) % advertisements.length);
  };

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    setTouchStartX(null);
  };

  return (
    <section style={{ padding: '1.5rem 0', margin: '2rem 0' }}>
      <div
        style={{
          width: '95vw',
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '2px',
          borderRadius: '15px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3), rgba(56,189,248,0.25), rgba(248,113,113,0.3))'
        }}
      >
        <div
          style={{
            borderRadius: '15px',
            background: 'var(--color-surface)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 30px 70px rgba(15, 23, 42, 0.25)',
            padding: '1.5rem',
            position: 'relative'
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '180px',
              overflow: 'hidden',
              borderRadius: '24px'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => setTouchStartX(null)}
          >
            {advertisements.map((ad, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: ad.color,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '1rem',
                  opacity: currentSlide === index ? 1 : 0,
                  transition: 'opacity 0.9s ease-in-out'
                }}
              >
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {ad.title}
                  </h3>
                  <p style={{ fontSize: '1rem', marginBottom: '0.5rem', opacity: 0.9 }}>
                    {ad.description}
                  </p>
                  <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                    📞 {ad.contact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;