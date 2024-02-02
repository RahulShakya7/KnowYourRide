// Import required modules
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

// Load environment variables from a .env file
dotenv.config();

// Create and configure the nodemailer transporter
const transporter = nodemailer.createTransport({
  // Configure your email provider settings here
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER_ID,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

// Export the transporter for use in other modules
module.exports = transporter;
