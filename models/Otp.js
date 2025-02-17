const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  email_otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, default: () => Date.now() + 10 * 60 * 1000 }, // OTP expires in 10 minutes
});

module.exports = mongoose.model("Otp", OtpSchema);
