// Express Router for Analytics APIs (Blueprint §7 Admin Analytics)
const express = require('express');
const router = express.Router();
const analyticsController = require('./analyticsController');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Mounted under /admin, all routes admin-only
router.get('/', asyncWrapper(analyticsController.getStats));

module.exports = router;
