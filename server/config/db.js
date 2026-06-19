const mongoose = require('mongoose');

global.dbMode = 'json'; // Default fallback mode

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/soundfolio';
  
  try {
    console.log('Connecting to database...');
    // Attempt Mongoose connection with a short timeout to prevent long delays
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    
    global.dbMode = 'mongodb';
    console.log('--------------------------------------------------');
    console.log('🚀 DATABASE STATUS: Connected to MongoDB successfully!');
    console.log(`URI: ${uri.replace(/\/\/.*@/, '//***:***@')}`); // log masked URI
    console.log('--------------------------------------------------');
  } catch (error) {
    global.dbMode = 'json';
    console.log('--------------------------------------------------');
    console.log('⚠️ DATABASE WARNING: MongoDB connection failed.');
    console.log(`Reason: ${error.message}`);
    console.log('💾 FALLBACK ACTIVATED: Running on local JSON database.');
    console.log('Data stores are managed inside server/data/*.json');
    console.log('--------------------------------------------------');
  }
};

module.exports = connectDB;
