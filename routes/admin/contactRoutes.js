const express = require("express")
const { getAllContactForms, updateContactForm } = require("../../controllers/admin/contactController")
const router = express.Router()

router.get("/", getAllContactForms );
router.put("/update/:id", updateContactForm );

module.exports = router;