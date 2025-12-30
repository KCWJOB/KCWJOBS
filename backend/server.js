const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { initializeAutoDelete } = require('./services/autoDelete');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/youtube', require('./routes/youtube'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sarkari-result')
  .then(() => {
    console.log('MongoDB connected successfully');
    // Initialize auto-deletion system after DB connection
    initializeAutoDelete();
  })
  .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});