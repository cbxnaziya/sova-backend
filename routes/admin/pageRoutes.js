// 📁 routes/pageRoutes.js
const express = require("express");
const router = express.Router();
const pageController = require("../../controllers/admin/pageController");

router.get("/", pageController.getAllPages);
router.get("/:id", pageController.getPageById);
router.post("/add", pageController.createPage);
router.put("/update/:id", pageController.updatePage);
router.delete("/remove/:id", pageController.deletePage);
router.patch("/update/:id", pageController.updatePageStatus)


module.exports = router;