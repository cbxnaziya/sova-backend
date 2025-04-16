// models/CMS.js
const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  section: {
    type: String,
    enum: ['hero', 'about', 'features', 'cta'],
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CMS', cmsSchema);
