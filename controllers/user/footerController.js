const Footer = require("../../models/Footer");


// Get Footer Data
exports.getFooterContent = async (req, res) => {
    try {
      const footer = await Footer.findOne();
      if (!footer) return res.status(404).json({success:false, message: "Footer not found" });
      res.status(200).json({success:true,footer:footer});
    } catch (error) {
      res.status(500).json({ error: "Error retrieving footer data", details: error.message });
    }
  };