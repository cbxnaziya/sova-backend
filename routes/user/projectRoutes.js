const express = require('express');
const { saveProject, getProjectByUserId } = require('../../controllers/user/projectController');
const authMiddleware = require('../../middleware/authMiddleware');
const router = express.Router();

router.post('/save',authMiddleware, saveProject);
router.get('/', authMiddleware, getProjectByUserId )

module.exports = router;
