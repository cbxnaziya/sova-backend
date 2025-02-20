const Header = require("../models/Header");

// Create new header
exports.createHeader = async (req, res) => {
  try {
    const header = new Header(req.body);
    await header.save();
    res.status(201).json(header);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all headers
exports.getHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.json(headers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get header by ID
exports.getHeaderById = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) return res.status(404).json({ message: "Header not found" });
    res.json(header);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update header by ID
exports.updateHeader = async (req, res) => {
  try {
    const updatedHeader = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHeader) return res.status(404).json({ message: "Header not found" });
    res.json(updatedHeader);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete header by ID
exports.deleteHeader = async (req, res) => {
  try {
    const deletedHeader = await Header.findByIdAndDelete(req.params.id);
    if (!deletedHeader) return res.status(404).json({ message: "Header not found" });
    res.json({ message: "Header deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
