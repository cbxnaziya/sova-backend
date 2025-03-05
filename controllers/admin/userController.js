
// const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");

// Get all users
exports.getUsers = async (req, res) => {
  // try {
  //   const users = await User.find();
  //   return res.json({success:true,users:users});
  // } catch (error) {
  //   return res.status(500).json({success:false,message:"Internal server error"})
  // }
  try {

    const users = await User.find();

    return res.status(200).json({ success: true, users: users });

  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ success: false, message: "Internal server error" })
  }


};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {

    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: true, message: "User not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone,password ,status, role} = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    console.log("existingUser....", existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email, 
      phone,
      password: hashedPassword,
      status,
      role

    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {

    const { name,email, account_name, company, phone, country, status, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {name, email, account_name, company, phone, country, status, role },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({success:true, message: "User updated successfully",  });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
