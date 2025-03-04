const express = require("express");
const { getAllCustomer, addCustomer, updateCustomer, deleteCustomer, getCustomer } = require("../../controllers/admin/customerController");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router()


router.get("/",authMiddleware, getCustomer)
router.get("/all", getAllCustomer)
router.post("/add",addCustomer)

router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

module.exports = router;