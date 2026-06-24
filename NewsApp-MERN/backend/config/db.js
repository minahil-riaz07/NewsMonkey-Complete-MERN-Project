const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  // Check if MONGO_URI exists
  if (!mongoUri) {
    console.error('❌ MONGO_URI is not defined in environment variables!');
    console.error('Please set MONGO_URI in your .env file or Render environment variables.');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('Please check your MONGO_URI and network access.');
    process.exit(1);
  }
};

module.exports = connectDB;