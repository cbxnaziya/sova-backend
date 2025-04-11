const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/userController");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/",authMiddleware, userController.getUserById);
// router.get("/",authMiddleware, userController.getUserById);
router.get("/permissions",authMiddleware, userController.getUserPermission);
router.get("/all", userController.getUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/add", userController.createUser);
router.get("/filter", authMiddleware, userController.filterUsers);




module.exports = router;
