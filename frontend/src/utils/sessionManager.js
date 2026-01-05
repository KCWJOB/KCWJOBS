export const sessionManager = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('adminToken');
    const expiry = localStorage.getItem('adminTokenExpiry');
    
    if (!token || !expiry) {
      return false;
    }
    
    // Check if token is expired
    if (Date.now() > parseInt(expiry)) {
      sessionManager.clearSession();
      return false;
    }
    
    return true;
  },

  // Clear all session data
  clearSession: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminTokenExpiry');
  },

  // Get remaining session time in minutes
  getSessionTimeRemaining: () => {
    const expiry = localStorage.getItem('adminTokenExpiry');
    if (!expiry) return 0;
    
    const remaining = parseInt(expiry) - Date.now();
    return Math.max(0, Math.floor(remaining / (1000 * 60)));
  }
};