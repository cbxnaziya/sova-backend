const express = require("express");
const { getRoles, addRole, updateRole, removeRole } = require("../../controllers/admin/rolesController");
const router = express.Router();


router.get("/", getRoles);
router.post("/add",addRole);
router.put("/:id",updateRole);
router.delete("/:id", removeRole)



module.exports = router;