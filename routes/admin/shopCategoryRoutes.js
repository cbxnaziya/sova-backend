const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../../controllers/admin/shopCategoryController');
const authMiddleware = require('../../middleware/authMiddleware');

router.get('/all', authMiddleware, getAllCategories);
router.post('/add',authMiddleware, createCategory);
router.put('/update',authMiddleware, updateCategory);
router.delete('/remove',authMiddleware, deleteCategory);



module.exports = router;
