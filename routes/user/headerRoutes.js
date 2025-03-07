const express = require("express");
const { getHeaderContent } = require("../../controllers/user/headerController");
const router = express.Router()

router.get("/", getHeaderContent)



module.exports = router;