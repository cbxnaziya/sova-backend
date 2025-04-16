// routes/cmsRoutes.js
const express = require('express');
const router = express.Router();
const cmsController = require('../../controllers/admin/cmsController');

router.get('/cms/sections', cmsController.getAllSections);
router.post('/cms/section', cmsController.updateSection);

router.get('/cms/static-pages', cmsController.getStaticPages);
router.post('/cms/static-page', cmsController.addStaticPage);
router.get('/cms/static-page/:slug', cmsController.getStaticPageBySlug);






















module.exports = router; 
