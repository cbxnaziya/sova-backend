
const express = require('express');
const { createSubCategory, getSubCategories, getSubCategoryById, deleteSubCategory } = require("../../controllers/admin/modelSubCategoryController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });



router.get("/all",authMiddleware, getSubCategories);
router.post("/add",authMiddleware, upload.single("file"), createSubCategory);
router.get("/",authMiddleware, getSubCategoryById);
router.delete("/:id", deleteSubCategory);


module.exports = router;