const express = require("express");
const { login } = require("../../controllers/admin/authController");

const router = express.Router();

router.post("/login", login);

module.exports = router;
