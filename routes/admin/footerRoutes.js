const express = require("express");
const router = express.Router();
const footerController = require("../../controllers/admin/footerController");

router.post("/", footerController.createOrUpdateFooter);  // Create or Update
router.get("/", footerController.getFooter);  // Retrieve
router.delete("/remove", footerController.deleteFooter);  // Delete

module.exports = router;
