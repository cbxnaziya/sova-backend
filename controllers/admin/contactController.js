const Contact = require("../../models/Contact");

exports.getAllContactForms = async (req,res) => {
try{
 let contactForms = await Contact.find().populate("user", "name email"); // Fetch all contact forms
   return res.status(200).json({success:true,forms:contactForms})
}catch(error){
    console.log("Error",error);
    return res.status(500).json({success:false,message:"Internal server error."})
}
}