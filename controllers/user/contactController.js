const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

  exports.contactUs = async (req, res) => {
    const { name, email, message } = req.body;
  
    try {
      if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Set up Nodemailer transport configuration
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });
  
      // Mail options
      const mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL, // Admin's email address to receive inquiries
        subject: `Contact Us Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      };  
      // Send the email
      await transporter.sendMail(mailOptions);  
      // Respond with success message
      res.status(200).json({ message: "Your message has been sent successfully." });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  }