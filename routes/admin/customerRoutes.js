const express = require("express");
const { getAllCustomer, addCustomer } = require("../../controllers/admin/customerController");
const router = express.Router()


router.get("/all", getAllCustomer)
router.post("/add",addCustomer)

module.exports = router;