const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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




