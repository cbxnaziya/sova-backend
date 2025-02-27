const Footer = require("../../models/Footer");

// Create or Update Footer
exports.createOrUpdateFooter = async (req, res) => {
  try {
    console.log("Footer:",req.body);
    
    const existingFooter = await Footer.findOne();

    if (existingFooter) {
      const updatedFooter = await Footer.findByIdAndUpdate(existingFooter._id, req.body, { new: true });
      return res.status(200).json(updatedFooter);
    }

    const newFooter = new Footer(req.body);
    await newFooter.save();
    return res.status(201).json({success:true,message:"Footer content successfully updated."});
  } catch (error) {
    res.status(500).json({ error: "Error saving footer data", details: error.message });
  }
};

// Get Footer Data
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({success:false, message: "Footer not found" });
    res.status(200).json({success:true,footer:footer});
  } catch (error) {
    res.status(500).json({ error: "Error retrieving footer data", details: error.message });
  }
};

// Delete Footer
exports.deleteFooter = async (req, res) => {
  try {
    await Footer.deleteMany({});
    res.status(200).json({ success:true, message: "Footer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting footer", details: error.message });
  }
};
