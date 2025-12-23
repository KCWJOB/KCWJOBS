import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jobsAPI } from '../services/api';
import JobCard from '../components/JobCard';
import { FaArrowLeft } from 'react-icons/fa';

const CategoryPage = () => {
  const { category } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [category]);

  const fetchJobs = async () => {
    try {
      const response = await jobsAPI.getAllJobs(category);
      // Handle both response.data and response.data.data formats
      const jobsData = response.data?.data || response.data || [];
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryTitle = (value) => {
    switch (value) {
      case 'result':
        return 'Results';
      case 'admit-card':
        return 'Admit Cards';
      case 'upcoming-job':
        return 'Upcoming Jobs';
      default:
        return 'Jobs';
    }
  };

  const getCategoryBackground = (value) => {
    switch (value) {
      case 'result':
        return 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 100%)';
      case 'admit-card':
        return 'linear-gradient(135deg, #e0f2ff 0%, #f5fbff 100%)';
      case 'upcoming-job':
        return 'linear-gradient(135deg, #fff5f1 0%, #fff9f4 100%)';
      default:
        return 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)';
    }
  };

  if (loading) {
    return (
      <section style={{
        background: getCategoryBackground(category),
        color: '#0f172a',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.05)'
      }}>
        <div className="container" style={{
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.125rem'
        }}>
          Loading category jobs...
        </div>
      </section>
    );
  }

  return (
    <div>
      <section style={{
        background: getCategoryBackground(category),
        color: '#0f172a',
        padding: '3rem 0',
        borderBottom: '1px solid rgba(15, 23, 42, 0.05)'
      }}>
        <div className="container">
          <Link to="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text)',
            textDecoration: 'none',
            marginBottom: '2rem',
            fontWeight: '600',
            opacity: 0.8
          }}>
            <FaArrowLeft />
            Back to Home
          </Link>

          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            {getCategoryTitle(category)}
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            opacity: 0.8
          }}>
            {jobs.length} {jobs.length === 1 ? 'notification' : 'notifications'} available
          </p>
        </div>
      </section>

      {/* Jobs Section */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          {jobs.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 0'
            }}>
              <h2 style={{
                fontSize: '1.5rem',
                color: 'var(--color-muted)',
                marginBottom: '1rem'
              }}>
                No {getCategoryTitle(category).toLowerCase()} available at the moment
              </h2>
              <p style={{
                color: 'var(--color-muted)',
                marginBottom: '2rem',
                opacity: 0.8
              }}>
                Please check back later for updates
              </p>
              <Link to="/" className="btn btn-primary">
                Go Back Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;