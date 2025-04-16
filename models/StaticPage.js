// models/StaticPage.js
const mongoose = require('mongoose');

const staticPageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }
});

module.exports = mongoose.model('StaticPage', staticPageSchema);
