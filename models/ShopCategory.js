const mongoose = require('mongoose');

const shopCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('ShopCategory', shopCategorySchema);
