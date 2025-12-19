import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';
import Advertisement from '../components/Advertisement';
import UpdatesLogin from '../components/UpdatesLogin';
import { FaGraduationCap, FaFileAlt, FaBriefcase, FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const tilePalette = ['#1f2937', '#11182d', '#1a1f3c', '#1f1234', '#1b2a4a', '#162032', '#1d1b3a', '#1b2a2f'];

const quickCTAs = [
  { icon: <FaGraduationCap size={18} />, label: 'Exam Ready Guides', link: '/category/result' },
  { icon: <FaFileAlt size={18} />, label: 'Instant Admit Cards', link: '/category/admit-card' },
  { icon: <FaBriefcase size={18} />, label: 'Fresh Job Drives', link: '/category/upcoming-job' }
];

const highlightColumnsConfig = [
  {
    id: 'results',
    title: 'Result Updates',
    accent: '#dc2626',
    tint: '#fff5f5',
    empty: 'No results available'
  },
  {
    id: 'admitCards',
    title: 'Admit Cards',
    accent: '#0ea5e9',
    tint: '#ecfeff',
    empty: 'No admit cards available'
  },
  {
    id: 'upcomingJobs',
    title: 'Latest Jobs',
    accent: '#f97316',
    tint: '#fff7ed',
    empty: 'No jobs available'
  }
];

const Home = () => {
  const [jobs, setJobs] = useState({
    results: [],
    admitCards: [],
    upcomingJobs: [],
    latest: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const [resultsRes, admitCardsRes, upcomingJobsRes, latestRes] = await Promise.all([
        jobsAPI.getAllJobs('result'),
        jobsAPI.getAllJobs('admit-card'),
        jobsAPI.getAllJobs('upcoming-job'),
        jobsAPI.getAllJobs()
      ]);

      console.log('API Response:', { resultsRes, admitCardsRes, upcomingJobsRes, latestRes });
      
      const resultsData = resultsRes.data?.data || [];
      const admitCardsData = admitCardsRes.data?.data || [];
      const upcomingJobsData = upcomingJobsRes.data?.data || [];
      const latestData = latestRes.data?.data || [];
      
      setJobs({
        results: resultsData.slice(0, 3),
        admitCards: admitCardsData.slice(0, 3),
        upcomingJobs: upcomingJobsData.slice(0, 3),
        latest: latestData.slice(0, 6) // Always show only 6 cards
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Set empty arrays on error
      setJobs({
        results: [],
        admitCards: [],
        upcomingJobs: [],
        latest: []
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '1.125rem'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <div>
      {/* Top Section */}
      <section style={{
        padding: '3rem 0',
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-strong) 45%, var(--color-bg-warm) 100%)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div className="container">
          {/* Advertisement Section */}
          <div style={{ marginBottom: '2rem' }}>
            <Advertisement />
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#25D366',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '999px',
              textDecoration: 'none',
              fontWeight: '600',
              marginBottom: '2rem',
              fontSize: '1.1rem',
              boxShadow: '0 15px 35px rgba(37, 211, 102, 0.35)'
            }}
          >
            <FaWhatsapp size={20} />
            Join WhatsApp
          </a>

          {/* SarkariResult Tools */}
          <h1 style={{
            fontSize: '2.75rem',
            fontWeight: '700',
            color: 'var(--color-primary)',
            marginBottom: '0.75rem'
          }}>
            SarkariResult Tools
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: 'var(--color-muted)',
            marginBottom: '2.5rem'
          }}>
            Quick access tiles for the most requested job updates, tailor-made for a bright daytime interface.
          </p>

          {/* Dynamic Job Cards Grid */}
          <div className="job-cards-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            marginBottom: '3rem',
            gridAutoRows: '1fr'
          }}>
            {jobs.latest.map((job, index) => (
              <Link
                key={job._id}
                to={`/job/${job._id}`}
                style={{ textDecoration: 'none', display: 'block', height: '100%' }}
              >
                <div
                  style={{
                    background: tilePalette[index % tilePalette.length],
                    color: '#f8fafc',
                    padding: '1.75rem',
                    borderRadius: '20px',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-6px)';
                    event.currentTarget.style.boxShadow = '0 25px 45px rgba(15, 23, 42, 0.12)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.boxShadow = '0 15px 35px rgba(15, 23, 42, 0.08)';
                  }}
                >
                  <div>
                    {job.title.length > 60 ? `${job.title.substring(0, 60)}...` : job.title}
                    <br />
                    <span style={{
                      fontSize: '0.95rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      marginTop: '0.5rem',
                      color: 'rgba(248, 250, 252, 0.8)'
                    }}>
                      <FaArrowRight /> {job.organization}
                      {job.posts && ` • ${job.posts} Posts`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick CTA Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            {quickCTAs.map((cta) => (
              <Link key={cta.label} to={cta.link} className="cta-button">
                {cta.icon}
                <span>{cta.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Three Column Section */}
      <section style={{ padding: '3rem 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <div className="three-column-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {highlightColumnsConfig.map((column) => {
              const columnJobs = jobs[column.id] || [];
              return (
                <div
                  key={column.id}
                  className="card-rich"
                  style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}
                >
                  <div style={{
                    background: column.tint,
                    padding: '1.25rem',
                    textAlign: 'center',
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: column.accent,
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {column.title}
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0, color: 'var(--color-card-text)' }}>
                      {columnJobs.slice(0, 6).map((job) => (
                        <li key={job._id} style={{ marginBottom: '0.75rem' }}>
                          <Link to={`/job/${job._id}`} style={{
                            color: 'var(--color-card-text)',
                            textDecoration: 'none',
                            fontWeight: '600'
                          }}>
                            {job.title}
                          </Link>
                          {column.id === 'upcomingJobs' && job.posts && (
                            <span style={{ color: 'var(--color-card-muted)', fontSize: '0.85rem' }}>
                              {' '}
                              ({job.posts} Posts)
                            </span>
                          )}
                        </li>
                      ))}
                      {columnJobs.length === 0 && (
                        <li style={{ color: 'var(--color-card-muted)', fontStyle: 'italic' }}>{column.empty}</li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Updates Login Section */}
      <UpdatesLogin />
    </div>
  );
};

export default Home;