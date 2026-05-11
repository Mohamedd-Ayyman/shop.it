// Express Router for Category APIs (Blueprint §7 Categories)
const express = require('express');
const router = express.Router();
const categoryController = require('./categoryController');
const categoryValidators = require('./categoryValidators');
const validate = require('../../shared/middleware/validate');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Public
router.get('/', asyncWrapper(categoryController.list));
router.get('/:slug', asyncWrapper(categoryController.getBySlug));

// Admin (these will be mounted under /admin prefix in app.js)
router.post('/', validate(categoryValidators.create), asyncWrapper(categoryController.create));
router.put('/:id', validate(categoryValidators.update), asyncWrapper(categoryController.update));
router.delete('/:id', asyncWrapper(categoryController.remove));

module.exports = router;
