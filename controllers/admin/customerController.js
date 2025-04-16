
const bcrypt = require("bcryptjs");
const Customer = require("../../models/Customer");



exports.getAllCustomer = async (req, res) => {
  try {
    const {
      search,          // search by name or email (you can customize fields)
      sortBy, // default sorting
      order,       // asc or desc
      page,
      limit,
      status,
      startDate,
      endDate,             // example of filter (like "active", "inactive")
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { account_name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }
    
    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const customers = await Customer.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Customer.countDocuments(filter);

    return res.status(200).json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      customers
    });

  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// exports.getAllCustomer = async (req, res) => {

//   try {

//     const customers = await Customer.find();

//     return res.status(200).json({ success: true, customers: customers });

//   } catch (error) {
//     console.log("Error", error);
//     return res.status(500).json({ success: false, message: "Internal server error" })
//   }



// }

exports.addCustomer = async (req, res) => {
  
  // try {
  //     const { name, email, phone, status } = req.body;

  //     if (await Customer.exists()) {
  //         return res.status(409).json({ success: false, message: "Customer already exist." });
  //     }

  //     const newCustomer = await Customer.create({ name, email, phone, status });

  //     return res.status(201).json({ success: true, message: "Customer created successfully." });


  // } catch (error) {
  //     console.log("Error", error);
  //     return res.status(500).json({ success: false, message: "Internal server error" })
  // }


  try {
    const { email, account_name, company, password, phone, country } = req.body;

    // Check if user exists
    const existingUser = await Customer.findOne({ email });
    console.log("existingUser....", existingUser);

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newCustomer = new Customer({
      email,
      account_name,
      company,
      password: hashedPassword,
      phone,
      country,
    });

    await newCustomer.save();
    res.status(201).json({ success: true, message: "Customer created successfully", });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }

}

// Update user
exports.updateCustomer = async (req, res) => {
  try {

    const { email, account_name, company, phone, country, status } = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { email, account_name, company, phone, country, status },
      { new: true }
    );

    console.log("updatedCustomer", updatedCustomer);

    if (!updatedCustomer) return res.status(404).json({ success: false, message: "Customer not found" });

    return res.json({ success: true, message: "Customer updated successfully", });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deleteCustomer) return res.status(404).json({ message: "Customer not found" });

    res.json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await Customer.findById(id);
    if (!user) return res.status(404).json({ success: true, message: "Customer not found" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" })
  }

}