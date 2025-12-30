const express = require('express');
const router = express.Router();
const YouTubeUpdate = require('../models/YouTubeUpdate');
const auth = require('../middleware/auth');

// Get current YouTube update
router.get('/', async (req, res) => {
  try {
    const youtubeUpdate = await YouTubeUpdate.findOne({ isActive: true }).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: youtubeUpdate || {
        channelUrl: 'https://www.youtube.com/watch?v=3CkgSQWwNlk',
        thumbnailUrl: 'https://i.ytimg.com/vi/T55Kb8rrH1g/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDXmIIdZ92kYcdh0KLH0apV0UKG8w'
      }
    });
  } catch (error) {
    console.error('Error fetching YouTube update:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching YouTube update',
      error: error.message
    });
  }
});

// Update YouTube data (Admin only)
router.post('/', async (req, res) => {
  try {
    const { channelUrl, thumbnailUrl } = req.body;

    if (!channelUrl || !thumbnailUrl) {
      return res.status(400).json({
        success: false,
        message: 'Channel URL and Thumbnail URL are required'
      });
    }

    // Deactivate previous updates
    await YouTubeUpdate.updateMany({}, { isActive: false });

    // Create new update
    const youtubeUpdate = new YouTubeUpdate({
      channelUrl,
      thumbnailUrl,
      isActive: true
    });

    await youtubeUpdate.save();

    res.json({
      success: true,
      message: 'YouTube update saved successfully',
      data: youtubeUpdate
    });
  } catch (error) {
    console.error('Error saving YouTube update:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving YouTube update',
      error: error.message
    });
  }
});

module.exports = router;