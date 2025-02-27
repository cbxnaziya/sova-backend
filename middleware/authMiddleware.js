const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // const token = req.header("Authorization");
  const token = req.header("Authorization")?.split(" ")[1]; // Extract actual token

  if (!token) return res.status(401).json({success:false, message: "Token Required." });
  
  try {
    console.log("process.env.JWT_SECRET",process.env.JWT_SECRET,token);
    console.log("decode",jwt.decode(token));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log("decode",decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
       // Check if the error is specifically related to token expiration
       if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired" });
      }
      
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
