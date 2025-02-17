const nodemailer = require("nodemailer");
require("dotenv").config();


const sendEmail = async (fromEmail, toEmail, subject, text) => {
  try {
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
      from: fromEmail,
      to: toEmail,
      subject: subject,
      text: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Error sending email: " + error.message);
  }
};

module.exports = sendEmail;
