const Header = require("../../models/Header");

exports.getHeaderContent = async () =>{
    try {
        const headers = await Header.find();
        console.log("header", headers);
        
       return res.status(200).json({success:true,header:headers});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}