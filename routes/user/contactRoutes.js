const express = require("express");
const nodemailer = require("nodemailer");
const { contactUs } = require("../../controllers/user/contactController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

// POST endpoint for Contact Us API
router.post("/",authMiddleware, contactUs);

module.exports = router;
