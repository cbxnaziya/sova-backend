
// 📁 controllers/pageController.js
const Page = require("../../models/Page");

// exports.getAllPages = async (req, res) => {
//   try {
//     const pages = await Page.find();
//     res.status(200).json({success:true, pages});
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.getAllPages = async (req, res) => {
    try {
      const { search } = req.query;
  
      const query = search
        ? { name: { $regex: search, $options: "i" } } // case-insensitive search by title
        : {};
  
      const pages = await Page.find(query);
      res.status(200).json({ success: true, pages });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
exports.getPageById = async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ error: "Page not found" });
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPage = async (req, res) => {
  try {
const { name, slug, metaTitle, metaDescription, content } = req.body;

    const newPage = new Page({name, slug, metaTitle, metaDescription, content});
    await newPage.save();
    res.status(201).json({success:true, message:"Page created successfully"});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPage) return res.status(404).json({ success:false, error: "Page not found" });
    res.status(200).json({success:true, message:"Page updated successfully"})
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePageStatus = async (req, res) => {
  try {
    const {status} = req.body;
    if (!status) return res.status(404).json({ success:false, error: "status not found" });
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, {status}, {
    //   new: true,
    });
    if (!updatedPage) return res.status(404).json({ success:false, error: "Page not found" });
    res.status(200).json({success:true, message:"Page updated successfully"})
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    if (!deletedPage) return res.status(404).json({ success:false,  error: "Page not found" });
    res.status(200).json({ success:true, message: "Page deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
