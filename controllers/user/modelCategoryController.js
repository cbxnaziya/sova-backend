const ModelCategory = require("../../models/ModelCategory");




exports.getModelCategories = async (req, res) => {
    try {
        const categories = await ModelCategory.find();
        return res.status(200).json({ success: true, categories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};