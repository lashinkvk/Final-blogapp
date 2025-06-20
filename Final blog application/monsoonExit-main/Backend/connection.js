import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lashinachuthodika:lgGqSy9bmr5c3Ch6@cluster0.y6d37rg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;