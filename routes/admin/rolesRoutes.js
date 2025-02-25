const express = require("express");
const { getRoles, addRole } = require("../../controllers/admin/rolesController");
const router = express.Router();


router.get("/", getRoles)
router.post("/add",addRole)



module.exports = router;