// import express from "express";
// import { createCategory, getCategories } from "../../controllers/admin/modelCategoryController.js";
// import authMiddleware from "../../middleware/authMiddleware.js";
const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const { getModelCategories } = require("../../controllers/user/modelCategoryController");
const router = express.Router();


router.get("/all",authMiddleware, getModelCategories);


module.exports = router
