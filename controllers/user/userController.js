const User = require("../../models/User");

exports.getUser = async (req,res) =>{
    try{
        const  id  = req.user
      const user = await User.findOne({id})
    }catch(error){
   console.log("Error", error);   
    }
}