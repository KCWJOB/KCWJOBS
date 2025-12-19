import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import { FaCalendarAlt, FaBuilding, FaMoneyBillWave, FaUsers, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import { CATEGORY_SECTION_CONFIG, splitLines } from '../constants/categorySections';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await jobsAPI.getJob(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'result':
        return '#059669';
      case 'admit-card':
        return '#2563eb';
      case 'upcoming-job':
        return '#dc2626';
      default:
        return '#6b7280';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'result':
        return 'Result';
      case 'admit-card':
        return 'Admit Card';
      case 'upcoming-job':
        return 'Job Opening';
      default:
        return category;
    }
  };

  const getActionButtonText = (category) => {
    switch (category) {
      case 'result':
        return 'Check Result';
      case 'admit-card':
        return 'Download Admit Card';
      case 'upcoming-job':
        return 'Apply Now';
      default:
        return 'View Details';
    }
  };

  const renderDetailContent = (field, value) => {
    if (!value) return null;
    const lines = splitLines(value);

    if (field.type === 'text' && value.trim().length) {
      return (
        <p style={{
          lineHeight: '1.6',
          color: 'var(--color-text)',
          fontSize: '1rem'
        }}>
          {value}
        </p>
      );
    }

    if (lines.length <= 1) {
      const [label, ...rest] = (lines[0] || '').split(':');
      if (rest.length) {
        return (
          <p style={{ lineHeight: '1.6', color: 'var(--color-text)', fontSize: '1rem' }}>
            <span style={{ fontWeight: 600 }}>{label}:</span> {rest.join(':').trim()}
          </p>
        );
      }
      return (
        <p style={{ lineHeight: '1.6', color: 'var(--color-text)', fontSize: '1rem' }}>
          {lines[0]}
        </p>
      );
    }

    return (
      <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--color-text)', lineHeight: '1.6' }}>
        {lines.map((line, index) => {
          const [label, ...rest] = line.split(':');
          const detail = rest.join(':').trim();
          return (
            <li key={`${field.key}-${index}`} style={{ marginBottom: '0.35rem' }}>
              {detail ? (
                <>
                  <span style={{ fontWeight: 600 }}>{label}:</span> {detail}
                </>
              ) : (
                line
              )}
            </li>
          );
        })}
      </ul>
    );
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

  if (!job) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2>Job not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Go Back Home
        </Link>
      </div>
    );
  }

  const detailSections = CATEGORY_SECTION_CONFIG[job.category] || [];
  const hasDetailSections = detailSections.some((section) => job.details?.[section.key]);
  const heroLine1 = job.details?.heroLine1?.trim();
  const heroLine2 = job.details?.heroLine2?.trim();
  const heroLine3 = job.details?.heroLine3?.trim();
  const showHeroBanner = heroLine1 || heroLine2 || heroLine3;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-primary)',
        textDecoration: 'none',
        marginBottom: '2rem',
        fontWeight: '600'
      }}>
        <FaArrowLeft />
        Back to Home
      </Link>

      <div style={{
        background: 'var(--color-surface)',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: 'var(--shadow-soft)',
        border: '1px solid var(--color-border)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              background: getCategoryColor(job.category),
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              {getCategoryLabel(job.category)}
            </div>
            
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem',
              color: 'var(--color-text)',
              lineHeight: '1.2'
            }}>
              {job.title}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748b',
              fontSize: '1.125rem'
            }}>
              <FaBuilding />
              <span>{job.organization}</span>
            </div>
          </div>

          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{
              fontSize: '1.125rem',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {getActionButtonText(job.category)}
            <FaExternalLinkAlt />
          </a>
        </div>

        {showHeroBanner && (
          <div style={{
            borderRadius: '20px',
            padding: '1.75rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e2b4a 100%)',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 30px 60px rgba(15, 23, 42, 0.35)'
          }}>
            {heroLine1 && (
              <p style={{
                fontSize: '1rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                opacity: 0.8
              }}>
                {heroLine1}
              </p>
            )}
            {heroLine2 && (
              <h2 style={{
                fontSize: '2rem',
                margin: 0,
                fontWeight: 700
              }}>
                {heroLine2}
              </h2>
            )}
            {heroLine3 && (
              <p style={{
                marginTop: '0.5rem',
                fontWeight: 600,
                letterSpacing: '0.08em'
              }}>
                {heroLine3}
              </p>
            )}
          </div>
        )}

        {/* Key Information */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
          padding: '1.5rem',
          background: '#f8fafc',
          borderRadius: '8px'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: '#dc2626'
            }}>
              <FaCalendarAlt />
              <span style={{ fontWeight: '600' }}>
                {job.category === 'result' || job.category === 'admit-card' ? 'Post Date' : 'Last Date'}
              </span>
            </div>
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>
              {formatDate(job.lastDate)}
            </p>
          </div>

          {job.category === 'upcoming-job' && job.startDate && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: '#059669'
              }}>
                <FaCalendarAlt />
                <span style={{ fontWeight: '600' }}>Start Date</span>
              </div>
              <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>
                {formatDate(job.startDate)}
              </p>
            </div>
          )}

          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem',
              color: '#2563eb'
            }}>
              <FaMoneyBillWave />
              <span style={{ fontWeight: '600' }}>Application Fee</span>
            </div>
            <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>
              {job.applicationFee}
            </p>
          </div>

          {job.category === 'upcoming-job' && job.posts && (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                color: '#7c3aed'
              }}>
                <FaUsers />
                <span style={{ fontWeight: '600' }}>Total Posts</span>
              </div>
              <p style={{ fontSize: '1.125rem', fontWeight: '500' }}>
                {job.posts}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            Description
          </h2>
          <p style={{
            lineHeight: '1.7',
            color: '#1f2937',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            {job.description}
          </p>
        </div>

        {/* Eligibility */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#1e293b'
          }}>
            Eligibility Criteria
          </h2>
          <p style={{
            lineHeight: '1.7',
            color: '#1f2937',
            fontSize: '1.125rem',
            fontWeight: '500'
          }}>
            {job.eligibility}
          </p>
        </div>

        {/* Salary */}
        {job.category === 'upcoming-job' && job.salary && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Salary Details
            </h2>
            <p style={{
              lineHeight: '1.7',
              color: '#1f2937',
              fontSize: '1.125rem',
              fontWeight: '500'
            }}>
              {job.salary}
            </p>
          </div>
        )}

        {hasDetailSections && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#1e293b'
            }}>
              Detailed Breakdown
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}>
              {detailSections.map((section) => {
                const value = job.details?.[section.key];
                if (!value) return null;
                return (
                  <div
                    key={section.key}
                    style={{
                      background: 'var(--color-surface)',
                      borderRadius: '14px',
                      padding: '1.25rem',
                      border: '1px solid var(--color-border)',
                      boxShadow: '0 15px 35px rgba(15, 23, 42, 0.12)'
                    }}
                  >
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      marginBottom: '0.75rem',
                      color: '#0f172a'
                    }}>
                      {section.label}
                    </h3>
                    {renderDetailContent(section, value)}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
          borderRadius: '16px',
          color: '#ffffff'
        }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
            {job.category === 'result' ? 'Ready to Check Result?' : 
             job.category === 'admit-card' ? 'Ready to Download?' : 'Ready to Apply?'}
          </h3>
          <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
            {job.category === 'result' ? 'Click the button below to check your result' :
             job.category === 'admit-card' ? 'Click the button below to download your admit card' :
             'Click the button below to visit the official application page'}
          </p>
          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              background: '#ffffff',
              color: 'var(--color-primary)',
              fontWeight: '700',
              fontSize: '1.125rem',
              padding: '12px 32px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '999px'
            }}
          >
            {getActionButtonText(job.category)}
            <FaExternalLinkAlt />
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;