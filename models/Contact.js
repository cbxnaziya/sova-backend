const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
   name : {type:String},
   email:{ type:String},
   message:{type:String},
   user: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
   status:{type:String, enum:["new","resolved","pending"], default:"new"}
}, {timestamps:true});


// user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
// }, { timestamps: true }); 
module.exports = mongoose.model("Contact",ContactSchema)