// Environment Configuration Utility
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    NODE_ENV: 'development'
  },
  production: {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend-app.onrender.com/api',
    NODE_ENV: 'production'
  }
};

const environment = import.meta.env.MODE || 'development';

export default config[environment];