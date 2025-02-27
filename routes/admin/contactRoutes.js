const express = require("express")
const { getAllContactForms } = require("../../controllers/admin/contactController")
const router = express.Router()

router.get("/", getAllContactForms );

module.exports = router;