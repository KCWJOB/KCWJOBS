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
console.log('Attempting to connect to MongoDB Atlas...');
console.log('Connection string:', process.env.MONGODB_URI ? 'Using .env URI' : 'Using fallback URI');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kcwjan2026_db_user:W1qKg1VDh%40uTudI7j%21@ksjobs.dpxzod0.mongodb.net/sarkari-result?retryWrites=true&w=majority&appName=KSJOBS')
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    // Initialize auto-deletion system after DB connection
    initializeAutoDelete();
  })
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('Please check your MongoDB Atlas cluster URL and credentials');
  });

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});