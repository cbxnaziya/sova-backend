// 📁 models/Page.js
const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true},
  metaTitle: { type: String },
  metaDescription: { type: String },
  content: { type: String },
  status:{type:String, enum :['active', 'inactive'] , default:'active'}
}, {timestamps:true});

module.exports = mongoose.model("Page", pageSchema);