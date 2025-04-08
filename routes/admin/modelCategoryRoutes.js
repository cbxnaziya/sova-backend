// import express from "express";
// import { createCategory, getCategories } from "../../controllers/admin/modelCategoryController.js";
// import authMiddleware from "../../middleware/authMiddleware.js";
const express = require("express");
const { createModelCategory, getModelCategories, updateModelCategory, deleteModelCategory } = require("../../controllers/admin/modelCategoryController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/add",authMiddleware, createModelCategory);
router.get("/all",authMiddleware, getModelCategories);
router.put("/update",authMiddleware, updateModelCategory);
router.delete("/remove/:id", authMiddleware,deleteModelCategory)

module.exports = router
