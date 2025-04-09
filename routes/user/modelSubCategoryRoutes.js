const { getSubCategories, getSubCategoryById } = require("../../controllers/user/modelSubCategoryController");
const authMiddleware = require("../../middleware/authMiddleware");
const express = require("express");
const router = express.Router()


router.get("/",authMiddleware, getSubCategoryById);
router.get("/all",authMiddleware, getSubCategories);

module.exports = router;