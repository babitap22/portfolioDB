const mongoose = require('mongoose');
require('dotenv').config();

// Ensure MONGODB_URI is defined in your .env file
const Url = process.env.MONGODB_URI ;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB',Url);
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectToMongoDB;
