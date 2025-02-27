// const mongoose = require("mongoose");

// const linkSchema = new mongoose.Schema({
//   label: String,
//   url: String,
// });

// const sectionSchema = new mongoose.Schema({
//   title: String,
//   links: [linkSchema],
// });

// const socialLinkSchema = new mongoose.Schema({
//   icon: String,
//   url: String,
// });

// const footerSchema = new mongoose.Schema({
//   logoUrl: String,
//   socialLinks: [socialLinkSchema],
//   quickLinks: sectionSchema,
//   supermarketLinks: sectionSchema,
//   shelvingLinks: sectionSchema,
//   newsletter: {
//     title: String,
//     description: String,
//   },
//   copyright: String,
// });

// module.exports = mongoose.model("Footer", footerSchema);
const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  logoUrl: { type: String, required: true },
  socialLinks: [
    {
      icon: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  sections: [
    {
      name: { type: String, required: true },
      link: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true }
        }
      ]
    }
  ],
  lastSection: {
    name: { type: String, required: true },
    newsletter: {
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  },
  copyright: { type: String, required: true }
});

const Footer = mongoose.model("Footer", footerSchema);

module.exports = Footer;
  