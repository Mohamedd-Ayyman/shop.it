// Express Router for Review APIs (Blueprint §7 Reviews)
const express = require('express');
const router = express.Router();
const reviewController = require('./reviewController');
const reviewValidators = require('./reviewValidators');
const validate = require('../../shared/middleware/validate');
const auth = require('../../shared/middleware/auth');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Create review (auth required)
router.post('/', auth, validate(reviewValidators.create), asyncWrapper(reviewController.create));

// List reviews for a product by slug
router.get('/product/:slug', asyncWrapper(reviewController.listByProductSlug));

module.exports = router;
