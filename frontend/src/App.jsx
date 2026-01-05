import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobDetails from './pages/JobDetails';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';

// Theme manager component
const ThemeManager = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  
  useEffect(() => {
    if (isAdminPage) {
      // Force dark theme for admin pages
      document.body.classList.add('dark-theme');
    } else {
      // Apply saved theme for non-admin pages
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
    
    // Force CSS variables to update
    setTimeout(() => {
      document.body.style.visibility = 'hidden';
      document.body.offsetHeight; // Trigger reflow
      document.body.style.visibility = 'visible';
    }, 0);
  }, [isAdminPage, location.pathname]);
  
  return null;
};

function App() {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isAdminSubdomain = hostname.startsWith('admin.') && !isLocalhost;
  const isAdminMode = import.meta.env.VITE_ADMIN_MODE === 'true';
  
  // Set page title
  useEffect(() => {
    document.title = 'KCWJob - Government Jobs, Results & Admit Cards';
  }, []);
  
  // Check if we're in admin mode (either subdomain or environment variable)
  const showAdminOnly = isAdminSubdomain || isAdminMode;
  
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <ThemeManager />
        {/* Always show header except on admin login page */}
        <Header />
        
        <main className="flex-1">
          <Routes>
            {showAdminOnly ? (
              // Admin mode - only admin routes
              <>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="*" element={<AdminLogin />} />
              </>
            ) : (
              // Normal mode - all routes
              <>
                <Route path="/" element={<Home />} />
                <Route path="/job/:id" element={<JobDetails />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
                <Route path="*" element={<Home />} />
              </>
            )}
          </Routes>
        </main>
        
        {/* Always show footer except on admin login page */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;