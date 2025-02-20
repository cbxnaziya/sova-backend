const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// user Routes
app.use("/api/auth", require("./routes/user/authRoutes"));
app.use("/api/contact", require("./routes/user/contactRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));


// admin Routes
app.use("/api/users",  require("./routes/admin/userRoutes"));
app.use("/api/header", require("./routes/admin/headerRoutes")); 
app.use("/api/footer",  require("./routes/admin/footerRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
