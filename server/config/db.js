const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://priyadharshini_db_user:Priya1201@cluster0.7ugxn59.mongodb.net/test";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
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
