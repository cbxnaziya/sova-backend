const Role = require("../../models/Role");


exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        return res.json({ success: true, roles: roles })

    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({success:false,message:"Internal server error"})

    }
}

exports.addRole = async (req, res) => {
    try {
        const { name, description, status } = req.body;

        if (await Role.exists({ name })) return res.status(409).json({ success: false, message: "Role already exist." })


        const newRole = await Role.create({ name, description, status })

        return res.status(201).json({ success: true, message: "Role created successfully," })

    } catch (error) {

        console.log("Error", error);
        return res.status(500).json({ success: false, message: "Internal server error"})

    }
}