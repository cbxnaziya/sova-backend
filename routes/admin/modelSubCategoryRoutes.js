
const express = require('express');
const { createSubCategory, getSubCategories, getSubCategoryById, deleteSubCategory } = require("../../controllers/admin/modelSubCategoryController");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const upload = require("../../utils/multer")



router.post("/add", upload.single("modelFile"), createSubCategory);
router.get("/all", getSubCategories);
router.get("/:id", getSubCategoryById);
router.delete("/:id", deleteSubCategory);


module.exports = router;