import mongoose from 'mongoose';

const connectDatabase = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is required to connect to MongoDB');
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDatabase;
