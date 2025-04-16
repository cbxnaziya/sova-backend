// controllers/cmsController.js
const CMS = require('../../models/CMS');
const StaticPage = require('../../models/StaticPage');

exports.updateSection = async (req, res) => {
  const { section, content } = req.body;
  const updated = await CMS.findOneAndUpdate(
    { section },
    { content },
    { upsert: true, new: true }
  );
  res.json(updated);
};

exports.getAllSections = async (req, res) => {
  const sections = await CMS.find({});
  res.json(sections);
};

exports.addStaticPage = async (req, res) => {
  const { title, slug, content } = req.body;
  const page = await StaticPage.create({ title, slug, content });
  res.json(page);
};

exports.getStaticPages = async (req, res) => {
  const pages = await StaticPage.find({});
  res.json(pages);
};

exports.getStaticPageBySlug = async (req, res) => {
  const page = await StaticPage.findOne({ slug: req.params.slug });
  res.json(page);
};
