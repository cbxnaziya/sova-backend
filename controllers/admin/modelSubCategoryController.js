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

// exports.createSubCategory = async (req, res) => {
//   try {
//     const { name, categoryId } = req.body;
//     const modelUrl = req.file.filename.replace(/\\/g, "/"); // for Windows compatibility

//     const subcategory = await ModelSubCategory.create({
//       name,
//       categoryId,
//       modelUrl,
//     });

//     res.status(201).json(subcategory);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Create a new subcategory with file upload
exports.createSubCategory = async (req, res) => {
  const { name, category_id } = req.body;

  if (!name || !category_id || !req.file) {
    return res.status(400).json({ success: false, message: 'Name, category, and model file are required.' });
  }

  try {
    // Construct file URL like in createTexture
    const modelUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;


     const existingSubCategory = await ModelSubCategory.findOne({name,categoryId:category_id});
     if(existingSubCategory){
      return res.status(400).json({status:false, message:"Sub Category name of already exist."})
     }
    const newSubCategory = new ModelSubCategory({
      name,
      categoryId: category_id,
      modelUrl,
    });

    await newSubCategory.save();

    res.status(201).json({ success: true, message: 'Subcategory added successfully' });
  } catch (err) {
    console.error('Error creating subcategory:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getSubCategoryById = async (req, res) => {
  try {
    const {categoryId, name} = req.body;  
    const subcategory = await ModelSubCategory.find({categoryId,name}).populate("categoryId", "name");
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
