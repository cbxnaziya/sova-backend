const mongoose = require("mongoose");

const SocialIconSchema = new mongoose.Schema({
  name: String,
  url: String,
  icon: String, // Base64 or URL
});

const NavLinksSchema = new mongoose.Schema({
  name : String,
  url:String
})


const HeaderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String, default: null }, // Store image as Base64 or URL
  navLinks: { type: [NavLinksSchema], required: true },
  socialIcons: { type: [SocialIconSchema], default: [] },
  selectedLanguage: { type: String, required: true },
});

const Header = mongoose.model("Headre", HeaderSchema);

module.exports = Header;
