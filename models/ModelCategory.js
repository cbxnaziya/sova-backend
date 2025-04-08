const mongoose = require("mongoose");




const modelCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("ModelCategory", modelCategorySchema);


