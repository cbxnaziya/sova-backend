const mongoose = require('mongoose');

const homeCMSSchema = new mongoose.Schema({
  backgroundImage: {
    type: String,
    required: false,
  },
  heading: {
    type: String,
    required: true,
  },
  subHeading: String,
  metaTitle: String,
  metaDescription: String,
}, { timestamps: true });

module.exports = mongoose.model('HomeCMS', homeCMSSchema);
