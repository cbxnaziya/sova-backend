const express = require("express");
const nodemailer = require("nodemailer");
const { contactUs } = require("../../controllers/user/contactController");
const router = express.Router();

// POST endpoint for Contact Us API
router.post("/", contactUs);

module.exports = router;
