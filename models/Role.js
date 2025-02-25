const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
name : {type:String, unique:true},
description :{type:String},
status:{type:String, enum: ["active","inactive","pending"]}
})

module.exports = mongoose.model("Role", RoleSchema)