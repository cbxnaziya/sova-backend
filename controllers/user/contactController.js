
const Contact = require("../../models/Contact");
const sendEmail = require("../../utils/email"); // Import the sendEmail function
require("dotenv").config();


exports.contactUs = async (req, res) => {
  const { name, email, message } = req.body;

  console.log("req.user.id",req.user.id);
  

  console.log("email:",process.env.EMAIL_USER,name,email, message );
  

  try {
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Set up email details
    const subject = `Contact Us Message from ${name}`;
    const text = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    // Send the email using the utility function
    await sendEmail(email, process.env.EMAIL_USER, subject, text);

    await Contact.create({name,email,message,user:req.user.id})

    // Respond with success message
    res.status(200).json({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
