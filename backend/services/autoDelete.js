const Job = require('../models/Job');
const cron = require('node-cron');

// Calculate deletion date based on category
const calculateDeletionDate = (job) => {
  const baseDate = job.category === 'upcoming-job' ? job.lastDate : job.createdAt;
  const deletionDate = new Date(baseDate);
  
  switch (job.category) {
    case 'upcoming-job':
      deletionDate.setDate(deletionDate.getDate() + 15); // 15 days after last apply date
      break;
    case 'result':
      deletionDate.setDate(deletionDate.getDate() + 15); // 15 days after post date
      break;
    case 'admit-card':
      deletionDate.setMonth(deletionDate.getMonth() + 1); // 1 month after post date
      break;
  }
  
  return deletionDate;
};

// Get jobs scheduled for deletion (notification)
const getJobsForDeletionNotification = async () => {
  try {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const jobs = await Job.find({
      deletionScheduledAt: { $lte: tomorrow },
      deletionNotified: false,
      isActive: true
    });
    
    return jobs;
  } catch (error) {
    console.error('Error getting jobs for deletion notification:', error);
    return [];
  }
};

// Mark jobs as notified
const markJobsAsNotified = async (jobIds) => {
  try {
    await Job.updateMany(
      { _id: { $in: jobIds } },
      { deletionNotified: true }
    );
  } catch (error) {
    console.error('Error marking jobs as notified:', error);
  }
};

// Delete expired jobs (Admin confirmation required)
const deleteExpiredJobs = async () => {
  try {
    const now = new Date();
    const expiredJobs = await Job.find({
      deletionScheduledAt: { $lte: now },
      isActive: true
    });
    
    if (expiredJobs.length > 0) {
      // Only mark jobs for notification, don't delete automatically
      await Job.updateMany(
        { _id: { $in: expiredJobs.map(job => job._id) } },
        { deletionNotified: false } // Reset notification flag for admin review
      );
      
      console.log(`Found ${expiredJobs.length} jobs ready for admin review`);
    }
  } catch (error) {
    console.error('Error checking expired jobs:', error);
  }
};

// Initialize auto-deletion system
const initializeAutoDelete = () => {
  // Run daily at 9 AM to check for expired jobs
  cron.schedule('0 9 * * *', () => {
    console.log('Running daily job expiration check...');
    deleteExpiredJobs();
  });
  
  console.log('Auto-deletion system initialized');
};

module.exports = {
  calculateDeletionDate,
  getJobsForDeletionNotification,
  markJobsAsNotified,
  deleteExpiredJobs,
  initializeAutoDelete
};