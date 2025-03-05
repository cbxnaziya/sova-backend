const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   name : {type:String},
   email: {type:String},
   phone: {type:String},
   password: { type: String, required: true },
   status:{type:String,enum:["active","inactive","pending"], default:"active"},
   role: {type:String}

})

module.exports = mongoose.model("User",UserSchema)
// const mongoose = require("mongoose")

// const CustomerSchema = new mongoose.Schema({
//    name : {type:String},
//    email: {type:String},
//    phone: {type:String},
//    statue:{type:String,enum:["active","inactive","pending"]}

// })

// module.exports = mongoose.model("User",CustomerSchema)
