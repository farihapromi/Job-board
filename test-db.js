import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Load your environment variables

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to connect', err);
    process.exit(1);
  }
}

run();
