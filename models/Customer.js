const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema({
   name : {type:String},
   email: {type:String},
   phone: {type:String},
   statue:{type:String,enum:["active","inactive","pending"]}

})

module.exports = mongoose.model("Customer",CustomerSchema)