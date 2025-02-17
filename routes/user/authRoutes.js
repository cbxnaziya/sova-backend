const express = require("express");
const { register, login, requestPasswordReset, verifyOtp, updatePassword } = require("../../controllers/user/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Route to request password reset
router.post('/forget-password/request', requestPasswordReset);

// Route to verify OTP
router.post('/forget-password/verify', verifyOtp);

// Route to update the password
router.post('/forget-password/update', updatePassword);

module.exports = router;
