// Express Router for Product APIs (Blueprint §7 Products)
const express = require('express');
const router = express.Router();
const productController = require('./productController');
const productValidators = require('./productValidators');
const validate = require('../../shared/middleware/validate');
const auth = require('../../shared/middleware/auth');
const rbac = require('../../shared/middleware/rbac');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Public
router.get('/', asyncWrapper(productController.list));
router.get('/featured', asyncWrapper(productController.featured));
router.get('/:slug', asyncWrapper(productController.getBySlug));

// Admin (under /admin prefix in app.js)
router.post('/', auth, rbac('admin'), validate(productValidators.create), asyncWrapper(productController.create));
router.put('/:id', auth, rbac('admin'), validate(productValidators.update), asyncWrapper(productController.update));
router.delete('/:id', auth, rbac('admin'), asyncWrapper(productController.remove));

module.exports = router;
