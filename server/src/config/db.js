require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URL || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URL or MONGO_URI is required");
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected successfully");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
