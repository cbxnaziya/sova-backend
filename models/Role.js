const mongoose = require("mongoose")

const RoleSchema = new mongoose.Schema({
name : {type:String, unique:true},
description :{type:String},
status:{type:String, enum: ["active","inactive","pending"]},
permissions: [
    {
      page: { type: String, required: true },
      actions: { type: [String], required: true } // Example: ["create", "edit", "delete", "view"]
    }
  ]
})

module.exports = mongoose.model("Role", RoleSchema)