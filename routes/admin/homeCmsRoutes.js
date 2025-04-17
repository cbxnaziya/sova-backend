const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createHomeCMS,
  getAllCMS,
  getCMSById,
  updateCMS,
  deleteCMS,
} = require('../../controllers/admin/homeCmsController');

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('backgroundImage'), createHomeCMS);
router.get('/', getAllCMS);
router.get('/:id', getCMSById);
router.put('/:id', upload.single('backgroundImage'), updateCMS);
router.delete('/:id', deleteCMS);

module.exports = router;
