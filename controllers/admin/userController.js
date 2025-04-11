
// const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Role = require("../../models/Role");
const { default: mongoose } = require("mongoose");

// Get all users
// exports.getUsers = async (req, res) => {

//   try {

//     const users = await User.find();

//     return res.status(200).json({ success: true, users: users });

//   } catch (error) {
//     console.log("Error", error);
//     return res.status(500).json({ success: false, message: "Internal server error" })
//   }


// };

// Get all users with pagination
exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;        // Current page number
  const limit = parseInt(req.query.limit) || 10;     // Results per page
  const skip = (page - 1) * limit;
   const sort = req.query.sort || "latest";
  try {

    let sortOption = {};
if (sort === 'latest') sortOption = { _id: -1 };
else if (sort === 'oldest') sortOption = { _id: 1 };
else if (sort === 'nameAsc') sortOption = { name: 1 };
else if (sort === 'nameDesc') sortOption = { name: -1 };
else if (sort === 'phoneAsc') sortOption = { phone: 1 };
else if (sort === 'phoneDesc') sortOption = { phone: -1 };
else if (sort === 'emailAsc') sortOption = { email: 1 };
else if (sort === 'emailDesc') sortOption = { email: -1 };
console.log("sortoption", sortOption);

    const [users, total] = await Promise.all([
      User.find()
      .collation({ locale: "en", strength: 2 })
        .sort(sortOption) // 1. sort first by latest
        .skip(skip)              // 2. then skip
        .limit(limit),           // 3. then limit
      User.countDocuments()
    ]);
  
    return res.status(200).json({
      success: true,
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
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

exports.getUserPermission = async (req, res) => {
  try {
    const name = req.user.role;
    console.log(req.user.role, "role");
    
    // Find the role that matches the logged-in user's role
    const roleData = await Role.findOne({ name });
    
    console.log(roleData, "roleData");
    if (!roleData) {
      return res.status(404).json({ status: false, message: "Role not found." });
    }

    // Return only the permissions of the authenticated user's role
    return res.status(200).json({ status: true, permissions: roleData.permissions, role:roleData.name  });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: false, message: "Internal Server Error" });
  }
};



// exports.filterUsers = async (req, res) => {
//   const search = req.query.search;

//   try {
//     let users;
//     if (search) {
//       const isValidObjectId = mongoose.Types.ObjectId.isValid(search);
//       const query = {
//         // $or: [
//         //   { name: { $regex: search, $options: 'i' } },
//         //   { age: isNaN(search) ? null : parseInt(search) },
//         // ]
//         $or: [
//           { name: { $regex: search, $options: "i" } },
//           { email: { $regex: search, $options: "i" } },
//           { phone: { $regex: search, $options: "i" } },
//             ...(isValidObjectId ? [{ _id: search }] : []) // only add if valid ObjectId
//         ]
//       };

//       // Filter out nulls again
//       const filteredQuery = {
//         $or: query.$or.filter(condition => Object.values(condition)[0] !== null)
//       };

//       users = await User.find(filteredQuery);
//     } else {
//       users = await User.find();
//     }

//     return res.status(200).json({ success: true, users });
//   } catch (error) {
//     console.log("Error", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


// In your controller
exports.filterUsers = async (req, res) => {
  const search = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  try {
    const searchRegex = new RegExp(search, "i");

    const filter = {
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
        { phone: { $regex: searchRegex } }
      ]
    };

    const [users, total] = await Promise.all([
      User.find(search ? filter : {}).skip(skip).limit(limit),
      User.countDocuments(search ? filter : {})
    ]);

    res.status(200).json({
      success: true,
      users,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error filtering users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
