const ModelSubCategory = require("../../models/ModelSubCategory");

exports.getSubCategoryById = async (req, res) => {
    try {
        const { category_id, sub_category } = req.body;
        
        const subcategory = await ModelSubCategory.find({ categoryId:category_id, name:sub_category })
        if (!subcategory) return res.status(404).json({ message: "SubCategory not found" });
        res.status(200).json({success:true,subcategory});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.getSubCategories = async (req, res) => {
    try {
        const { category_id } = req.body;
        const subcategories = await ModelSubCategory.find({ categoryId: category_id })
        // .populate("categoryId", "name");
        res.status(200).json({ success: true, subcategories });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

