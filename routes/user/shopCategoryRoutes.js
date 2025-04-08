const express = require('express');
const router = express.Router();
const {
    getAllCategories,

} = require('../../controllers/user/shopCategoryController');

router.get('/all', getAllCategories);


module.exports = router;
