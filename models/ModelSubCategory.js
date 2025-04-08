const mongoose = require("mongoose");

const modelSubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ModelCategory",
        required: true,
    },
    modelUrl: {
        type: String,
        required: true,
    },
});


module.exports = mongoose.model("ModelSubCategory", modelSubCategorySchema);


