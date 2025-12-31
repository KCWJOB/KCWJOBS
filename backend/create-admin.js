const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb+srv://kcwjan2026_db_user:W1qKg1VDh%40uTudI7j%21@ksjobs.dpxzod0.mongodb.net/sarkari-result?retryWrites=true&w=majority&appName=KSJOBS');
    console.log('Connected to MongoDB');

    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const admin = new Admin({
      username: 'admin',
      password: 'admin123'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Username: admin');
    console.log('Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();