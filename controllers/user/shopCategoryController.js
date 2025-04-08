const ShopCategory = require('../../models/ShopCategory');

// Get All Shop Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await ShopCategory.find()
    res.status(200).json({
      success: true,
      categories: categories
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




