const Customer = require("../../models/Customer")


exports.getAllCustomer = async (req, res) => {
    try {

        const customers = await Customer.find();

        return res.status(200).json({ success: true, customers: customers });

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

exports.addCustomer = async (req, res) => {
    try {
        const { name, email, phone, status } = req.body;

        if (await Customer.exists()) {
            return res.status(409).json({ success: false, message: "Customer already exist." });
        }

        const newCustomer = await Customer.create({ name, email, phone, status });

        return res.status(201).json({ success: true, message: "Customer created successfully." });


    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}