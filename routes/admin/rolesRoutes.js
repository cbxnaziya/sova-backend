const express = require("express");
const {  addRole, updateRole, removeRole , getAllRoles} = require("../../controllers/admin/rolesController");
const router = express.Router();


router.get("/all", getAllRoles);
router.post("/add",addRole);
router.put("/:id",updateRole);
router.delete("/:id", removeRole);



module.exports = router;