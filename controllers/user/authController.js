const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../../models/User")
const Otp = require("../../models/Otp");
const { getOtp } = require("../../utils/service");
const sendEmail = require("../../utils/email");
const Customer = require("../../models/Customer");



// register controller
exports.register = async (req, res) => {
  const { email, account_name, company, password, phone, country } = req.body;
  // try {
  //   let user = await User.findOne({ email });
  //   console.log("user",user);
    
  //   if (user) return res.status(400).json({ message: "User already exists" });

  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   user = new User({ email, account_name, company, password: hashedPassword, phone, country, role:"customer" });

  //   await user.save();
  //   res.status(201).json({ message: "User registered successfully" });
  // } catch (error) {

  //   console.log("error", error);
  //   res.status(500).json({ message: "Server Error" });
  // }
  try {
    let user = await User.findOne({ email });
    console.log("user",user);
    
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new Customer({ email, account_name, company, password: hashedPassword, phone, country, role:"customer" });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {

    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await Customer.findOne({ email });
    if (!user) return res.status(400).json({   success: false,message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({   success: false,message: "Invalid Credentials" });
    console.log(" process.env.JWT_SECRET....", process.env.JWT_SECRET,user);
    

    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });


    res.json({  success: true,    message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await Customer.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate OTP
    // const otp = crypto.randomBytes(3).toString("hex");  // Generate a 6-digit OTP (3 bytes => 6 hex digits)
    const otp = getOtp(); // Generates a 4-digit OTP


    const existingOtp = await Otp.findOne({email});

    if(existingOtp){
      existingOtp.email_otp = otp;
      existingOtp.expiresAt = Date.now() + 10 * 60 * 1000;
      await existingOtp.save();
    } else{
      
      await Otp.create({
        email,
        email_otp: otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      })
    }





    const subject = "Password Reset OTP";
    const text = `Your OTP to reset your password is: ${otp}. It will expire in 10 minutes.`;

      // await transporter.sendMail(mailOptions);
      await  sendEmail(process.env.EMAIL_USER, email, subject, text);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.verifyOtp = async (req, res) => {
  const { email, email_otp } = req.body;

  try {
    // Find the user by email
    const user = await Otp.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if OTP exists and is within the expiration time
    if (!user.email_otp || user.email_otp != email_otp  ) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // OTP is valid
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updatePassword = async (req, res) => {
  const { email, new_Password } = req.body;

  try {
    // Find the user by email
    const user = await Customer.findOne({ email });
    // const existingOtp = await Otp.findOne({email});
    if (!user) return res.status(400).json({ message: "User not found" });


    // Hash the new password
    const hashedPassword = await bcrypt.hash(new_Password, 10);

    // Update the password
    user.password = hashedPassword;

    await user.save();
    await Otp.deleteOne({ email });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

