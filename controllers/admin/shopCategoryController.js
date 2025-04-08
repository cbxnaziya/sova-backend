const { default: mongoose } = require('mongoose');
const ShopCategory = require('../../models/ShopCategory');

// Get All Shop Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ShopCategory.find();
    res.status(200).json({
      success: true,
      categories: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Create a Shop Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new ShopCategory({ name });
    await category.save();
    res.status(201).json({ success: true, message: 'Category created successfully.' });
  } catch (error) {

    if(error.code == 11000){
        return res.status(400).json({success:false, message:"Shop category already exist."})
    }
    console.log("error",error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Update a Shop Category
exports.updateCategory = async (req, res) => {
  try {
    // const { id } = req.params;
    const { name, id } = req.body;

    const updated = await ShopCategory.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// Delete a Shop Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    // Validate ID presence
    if (!id) {
      return res.status(400).json({ success: false, message: 'Category ID is required.' });
    }

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid category ID format.' });
    }

    const deleted = await ShopCategory.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully.' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
