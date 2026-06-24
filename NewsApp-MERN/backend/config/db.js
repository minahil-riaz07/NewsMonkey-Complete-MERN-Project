const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  const startMemoryServer = async () => {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ In-memory MongoDB started at ${uri}`);
    return conn;
  };

  try {
    if (!mongoUri) {
      console.warn('⚠️ No MONGO_URI supplied. Starting in-memory MongoDB fallback.');
      await startMemoryServer();
      return;
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️ Falling back to in-memory MongoDB.');
    await startMemoryServer();
  }
};

module.exports = connectDB;
