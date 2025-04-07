const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getAllTextures,
  getTextureById,
  createTexture,
  updateTexture,
  deleteTexture
} = require('../../controllers/admin/textureController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    
    // Sanitize and lowercase the texture category
    const safeCategory = (req.body.textureCategory || 'texture')
      .replace(/\s+/g, '_')
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .toLowerCase();

    const finalName = `${safeCategory}${extension}`;

    const uploadPath = path.join('uploads', finalName);
    
    // If file with same name exists, delete it (optional)
    if (fs.existsSync(uploadPath)) {
      fs.unlinkSync(uploadPath);
    }

    cb(null, finalName);
  },
});

const upload = multer({ storage });

// Routes
router.post('/add',authMiddleware, upload.single('image'), createTexture);
router.get('/all', getAllTextures);


router.get('/:texture_id', getTextureById);
router.put('/:texture_id', upload.single('image'), updateTexture);
router.delete('/:texture_id', deleteTexture);

module.exports = router;
