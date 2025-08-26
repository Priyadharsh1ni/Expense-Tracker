// config/db.js
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://priyariya1261:Test123@cluster0.73c2va1.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Bad auth : authentication failed');
    process.exit(1);
  }
};

module.exports = connectDB;
