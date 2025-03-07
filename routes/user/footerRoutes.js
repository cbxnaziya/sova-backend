const express = require("express");
const { getFooterContent } = require("../../controllers/user/footerController");
const router = express.Router()

router.get("/", getFooterContent)

module.exports = router ;