const ModelSubCategory = require("../../models/ModelSubCategory");

exports.getSubCategories = async (req, res) => {
  try {
    const {category_id} = req.body;
    const subcategories = await ModelSubCategory.find({categoryId:category_id})
    // .populate("categoryId", "name");
    res.status(200).json({success:true, subcategories});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const modelUrl = req.file.path.replace(/\\/g, "/"); // for Windows compatibility

    const subcategory = await ModelSubCategory.create({
      name,
      categoryId,
      modelUrl,
    });

    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await ModelSubCategory.findById(req.params.id).populate("categoryId", "name");
    if (!subcategory) return res.status(404).json({ message: "SubCategory not found" });
    res.status(200).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const subcategory = await ModelSubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: "SubCategory not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
