// src/libs/mongoose.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;
if (!MONGO_URI) throw new Error("Missing MONGO_URI!");

let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 80000, // 80 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });
  }

  try {
    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    console.log("Mongoose connected successfully within dbConnect"); // Add this log
    return cached.conn;
  } catch (error) {
    console.error("Error connecting to Mongoose:", error); // Add this error log
    throw error;
  }
}

export default dbConnect;