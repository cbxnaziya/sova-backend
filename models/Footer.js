const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const sectionSchema = new mongoose.Schema({
  title: String,
  links: [linkSchema],
});

const socialLinkSchema = new mongoose.Schema({
  icon: String,
  url: String,
});

const footerSchema = new mongoose.Schema({
  logoUrl: String,
  socialLinks: [socialLinkSchema],
  quickLinks: sectionSchema,
  supermarketLinks: sectionSchema,
  shelvingLinks: sectionSchema,
  newsletter: {
    title: String,
    description: String,
  },
  copyright: String,
});

module.exports = mongoose.model("Footer", footerSchema);
