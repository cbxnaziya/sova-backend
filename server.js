const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require('path')

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
connectDB();

// user Routes
app.use("/api/auth", require("./routes/user/authRoutes"));
app.use("/api/contact", require("./routes/user/contactRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/header",  require("./routes/user/headerRoutes"))
app.use("/api/footer", require("./routes/user/footerRoutes") )
app.use('/api/texture', require("./routes/user/textureRoutes"));
app.use("/api/shop", require("./routes/user/shopCategoryRoutes"))
app.use("/api/model-category", require("./routes/user/modelCategoryRoutes"));
app.use("/api/model-subcategory", require("./routes/user/modelSubCategoryRoutes"))
app.use('/api/projects', require("./routes/user/projectRoutes"));


// admin Routes
// app.use("/admin/api/auth", require("./routes/user/authRoutes"));
app.use("/admin/api/auth", require("./routes/admin/authRoutes"));
app.use("/admin/api/users",  require("./routes/admin/userRoutes"));
app.use("/admin/api/customer",  require("./routes/admin/customerRoutes"));
app.use("/admin/api/roles",  require("./routes/admin/rolesRoutes"));
app.use("/admin/api/header", require("./routes/admin/headerRoutes")); 
app.use("/admin/api/footer",  require("./routes/admin/footerRoutes"));
app.use("/admin/api/contact", require("./routes/admin/contactRoutes"));
app.use('/admin/api/texture', require("./routes/admin/textureRoutes"));
app.use('/admin/api/shop', require("./routes/admin/shopCategoryRoutes"));
app.use("/admin/api/model-category", require("./routes/admin/modelCategoryRoutes"));
app.use("/admin/api/model-subcategory", require("./routes/admin/modelSubCategoryRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
