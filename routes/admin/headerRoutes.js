const express = require("express");
// const { createHeader } = require("../../controllers/admin/headerController");
const { createHeader, getHeaders, getHeaderById, updateHeader, deleteHeader, createOrUpdateHeader } = require("../../controllers/admin/headerController");

const router = express.Router();

router.post("/", createOrUpdateHeader); // Create new header
router.get("/", getHeaders); // Get all headers
router.delete("/:id", deleteHeader); // Delete header by ID


router.get("/:id", getHeaderById); // Get a single header by ID
router.put("/:id", updateHeader); // Update header by ID

module.exports = router;
