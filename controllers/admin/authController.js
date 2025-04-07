const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



 exports.login = async (req, res) => {
   const { email, password } = req.body;
   try {
 
     const user = await User.findOne({ email });
     if (!user) return res.status(404).json({   success: false,message: "User not found." });
 
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.status(400).json({   success: false,message: "Invalid Credentials" });
     console.log(" process.env.JWT_SECRET....", process.env.JWT_SECRET,user);
     
 
     const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
 
 
     res.json({  success: true,    message: "Login successful", token });
 
   } catch (error) {
     res.status(500).json({ message: "Server Error" });
   }
 };
