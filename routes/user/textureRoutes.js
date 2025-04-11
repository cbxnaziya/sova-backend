const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getAllTextures,
  getTextureById,
  createTexture,
  updateTexture,
  deleteTexture
} = require('../../controllers/user/textureController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.get('/all', authMiddleware, getAllTextures);
router.get('/:texture_id', authMiddleware, getTextureById);



router.post('/', upload.single('image'), createTexture);
router.put('/:texture_id', upload.single('image'), updateTexture);
router.delete('/:texture_id', deleteTexture);

module.exports = router;
