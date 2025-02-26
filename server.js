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
app.use("/admin/api/users",  require("./routes/admin/userRoutes"));
app.use("/admin/api/roles",  require("./routes/admin/rolesRoutes"));
app.use("/admin/api/customer",  require("./routes/admin/customerRoutes"));
app.use("/admin/api/header", require("./routes/admin/headerRoutes")); 
app.use("/admin/api/footer",  require("./routes/admin/footerRoutes"));
app.use("/admin/api/contact", require("./routes/admin/contactRoutes"))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
