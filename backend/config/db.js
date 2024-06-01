import mongoose from "mongoose";

const connectDB = async () => {
  try {
     await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export default connectDB;