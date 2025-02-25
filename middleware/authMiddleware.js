const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });
  
  try {
    console.log("process.env.JWT_SECRET",process.env.JWT_SECRET);
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

// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddleware = (req, res, next) => {
//   try {
//     // Extract token from Authorization header (Bearer Token Format)
//     const authHeader = req.header("Authorization");
//     if (!authHeader) return res.status(401).json({ message: "Access Denied" });

//     const token = authHeader.split(" ")[1]; // Extract token if "Bearer <token>" format is used
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach decoded user data to request object

//     next(); // Pass to next middleware
//   } catch (error) {
//     // Handle specific JWT errors
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token has expired" });
//     }
//     if (error.name === "JsonWebTokenError") {
//       return res.status(400).json({ message: "Invalid Token" });
//     }

//     res.status(500).json({ message: "Server error in authentication" });
//   }
// };

// module.exports = authMiddleware;



