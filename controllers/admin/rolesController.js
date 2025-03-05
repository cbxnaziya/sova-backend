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
        const { name, description, status,permissions  } = req.body;

        if (await Role.exists({ name })) return res.status(409).json({ success: false, message: "Role already exist." })


        const newRole = await Role.create({ name, description, status, permissions  })

        return res.status(201).json({ success: true, message: "Role created successfully," })

    } catch (error) {

        console.log("Error", error);
        return res.status(500).json({ success: false, message: "Internal server error"})

    }
}

// exports.updateRole = async (req,res) =>{
//     try{

//     }catch(error){
//      console.log("Error", error);
     
//     }
// }




// Update Role
exports.updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, status,permissions } = req.body;

        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ success: false, message: "Role not found." });
        }

        // Update fields if provided
        if (name) role.name = name;
        if (description) role.description = description;
        if (status !== undefined) role.status = status;
        if (permissions) role.permissions = permissions;    

        await role.save();

        return res.json({ success: true, message: "Role updated successfully.", role });
    } catch (error) {
        console.error("Error updating role:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Delete Role
exports.removeRole = async (req, res) => {
    try {
        const { id } = req.params;

        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).json({ success: false, message: "Role not found." });
        }

        await Role.findByIdAndDelete(id);

        return res.json({ success: true, message: "Role deleted successfully." });
    } catch (error) {
        console.error("Error deleting role:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
