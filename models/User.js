const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  account_name: {type:String},
  company: {type:String},
  password: { type: String, required: true },
  phone: { type: String, required: true },
  country: { type: String, required: true },
  status:{type:String, enum:["active","inactive"],default:"active"}
});

module.exports = mongoose.model("User", UserSchema);
