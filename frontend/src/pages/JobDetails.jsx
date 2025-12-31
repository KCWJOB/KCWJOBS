import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaArrowLeft,
  FaWhatsapp
} from 'react-icons/fa';
import { CATEGORY_SECTION_CONFIG } from '../constants/categorySections';
import './JobDetails.css';

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

  const extractYouTubeId = (url) => {
    if (!url) return null;
    try {
      const parsedUrl = new URL(url);
      if (parsedUrl.hostname === 'youtu.be') {
        return parsedUrl.pathname.replace('/', '');
      }

      if (parsedUrl.searchParams.has('v')) {
        return parsedUrl.searchParams.get('v');
      }

      const segments = parsedUrl.pathname.split('/').filter(Boolean);
      const embedIndex = segments.findIndex((segment) => segment === 'embed');
      if (embedIndex !== -1 && segments[embedIndex + 1]) {
        return segments[embedIndex + 1];
      }

      return segments.pop();
    } catch (error) {
      return null;
    }
  };

  const youtubeThumbnailId = job?.youtubeLink ? extractYouTubeId(job.youtubeLink) : null;
  const youtubeThumbnailUrl = youtubeThumbnailId ? `https://img.youtube.com/vi/${youtubeThumbnailId}/hqdefault.jpg` : null;

  if (loading) {
    return (
      <div className="job-details-page job-details__loading" role="status" aria-live="polite">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-page">
        <div className="container job-details-container job-details__empty">
          <h2>Job not found</h2>
          <Link to="/" className="btn btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const detailSections = CATEGORY_SECTION_CONFIG[job.category] || [];
  const importantLinkItems = [
    {
      key: 'primary-action',
      label: getActionButtonText(job.category),
      href: job.applyLink,
      variant: 'primary'
    },
    job.organizationLink && {
      key: 'official-site',
      label: 'Official Site',
      href: job.organizationLink
    },
    job.shortNoticeLink && {
      key: 'short-notice',
      label: 'Short Notice',
      href: job.shortNoticeLink
    },
    job.syllabusLink && {
      key: 'syllabus',
      label: 'Syllabus / Notification',
      href: job.syllabusLink
    }
  ].filter(Boolean);

  return (
    <div className="job-details-page">
      <div className="container job-details-container">
        <Link to="/" className="job-details__back-link">
          <FaArrowLeft />
          Back to Home
        </Link>

        <section className="job-hero" aria-labelledby="job-title">
          <h1 id="job-title" className="job-hero__title">
            {job.title}
          </h1>
          <p className="job-hero__subtitle">{job.organization}</p>
        </section>

        <section className="job-details-card job-apply-card" aria-labelledby="job-apply-heading">
          <header className="job-apply-card__header" id="job-apply-heading">
            How To Apply For {job.title}
          </header>
          <div className="job-apply-card__body">
            <ul className="job-apply-card__list">
              <li>
                <strong>Interested Candidates</strong> Who Wish To Apply For The <strong>{job.organization}</strong> Post Can Submit Their Application Online Before{' '}
                <strong className="job-details__deadline">{formatDate(job.lastDate)}</strong>.
              </li>
              <li>Use The Click Here Link Provided Below Under Important Link Section To Apply Directly.</li>
              <li>
                Alternatively, Visit The <strong>Official Website Of {job.organization}</strong> To Complete The Application Process Online.
              </li>
              <li>
                Make Sure To Complete The Application Before The Deadline <strong className="job-details__deadline">{formatDate(job.lastDate)}</strong>.
              </li>
              <li className="job-details__notice">
                <strong>Note</strong> - छात्रों से ये अनुरोध किया जाता है की वो अपना फॉर्म भरने से पहले Official Notification को ध्यान से जरूर पढ़े उसके बाद ही अपना फॉर्म भरे ।{' '}
                <strong>(Last Date, Age Limit, &amp; Education Qualification)</strong>
              </li>
            </ul>
          </div>
        </section>

        <section className="job-keygrid" aria-label="Key job statistics">
          <article className="job-details-card job-keygrid__item">
            <h3>
              <FaCalendarAlt /> {job.category === 'result' || job.category === 'admit-card' ? 'Post Date' : 'Last Date'}
            </h3>
            <p className="job-details__metric job-details__metric--alert">{formatDate(job.lastDate)}</p>
          </article>

          <article className="job-details-card job-keygrid__item">
            <h3>
              <FaMoneyBillWave /> Application Fee
            </h3>
            <p className="job-details__metric">{job.applicationFee}</p>
          </article>

          {job.posts && (
            <article className="job-details-card job-keygrid__item">
              <h3>
                <FaUsers /> Total Posts
              </h3>
              <p className="job-details__metric">{job.posts}</p>
            </article>
          )}
        </section>

        <section className="job-section-grid">
          <article className="job-details-card job-section">
            <h3 className="job-section__title">Description</h3>
            <p className="job-section__text">{job.description}</p>
          </article>

          <article className="job-details-card job-section">
            <h3 className="job-section__title">Eligibility Criteria</h3>
            <p className="job-section__text">{job.eligibility}</p>
          </article>
        </section>

        {detailSections.length > 0 && (
          <section className="job-details-card job-additional" aria-labelledby="job-additional-heading">
            <header className="job-additional__header" id="job-additional-heading">
              {job.title} : Additional Information
            </header>
            <div className="job-additional__grid">
              {detailSections.map((section) => {
                const value = job.details?.[section.key];
                if (!value) return null;
                return (
                  <article key={section.key} className="job-additional__item">
                    <h4>{section.label}</h4>
                    <p>{value}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        <section className="job-details-social" aria-label="Social channels">
          <div className="social-links">
            <a
              href={job.whatsappLink || 'https://chat.whatsapp.com/CX7Ja6qgpM8Kp4or4xabLi'}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link social-link--whatsapp"
            >
              <div className="social-link__icon">
                <FaWhatsapp size={20} />
              </div>
              <div className="social-link__content">
                <span className="social-link__eyebrow">WhatsApp Channel</span>
                <span className="social-link__title">Join Our WhatsApp Community</span>
              </div>
              {/* <span className="social-link__cta">Follow Now</span> */}
            </a>
          </div>
        </section>

        <section className="important-links" aria-label="Important resources">
          <div className="important-links__banner">
            <span>Important Link</span>
          </div>

          <div className="important-links__panel">
            <div className="important-links__video" aria-live="polite">
              {youtubeThumbnailUrl ? (
                <>
                  <img src={youtubeThumbnailUrl} alt="YouTube preview for this vacancy" />
                  <a
                    href={job.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="important-links__video-cta"
                  >
                    Watch Video ↗
                  </a>
                </>
              ) : (
                <p className="important-links__video-placeholder">
                  youtube video thumbnail will show here from youtube link
                </p>
              )}
            </div>

            <div className="important-links__list" role="group" aria-label="Application actions">
              {importantLinkItems.map((item) => (
                <a
                  key={item.key}
                  className={`important-links__item${item.variant === 'primary' ? ' important-links__item--primary' : ''}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} - ${job.organization}`}
                >
                  <span>{item.label}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JobDetails;