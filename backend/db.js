const mongoose = require("mongoose");
require('dotenv').config();

const db_uri = process.env.NODE_ENV === 'test'
    ? process.env.TEST_DATABASE_URI
    : process.env.LOCAL_DATABASE_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(db_uri);

    console.log(
      `MongoDB connected to : ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = connectDB;