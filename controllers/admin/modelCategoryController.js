const ModelCategory = require("../../models/ModelCategory");



exports.createModelCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await ModelCategory.create({ name });
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getModelCategories = async (req, res) => {
    try {
        const categories = await ModelCategory.find();
        return res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.updateModelCategory = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || !name) {
            return res.status(400).json({ success: false, message: "ID and name are required." });
        }

        const updatedCategory = await ModelCategory.findByIdAndUpdate(
            id,               // no need for { _id: id } — pass `id` directly
            { name },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Category updated successfully.",
        });

    } catch (error) {
        console.error("Update category error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


exports.deleteModelCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Category ID is required." });
        }

        const deletedCategory = await ModelCategory.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ success: false, message: "Category not found." });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Category deleted successfully.",
       
        });

    } catch (error) {
        console.error("Delete category error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
