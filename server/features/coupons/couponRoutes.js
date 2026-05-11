// Express Router for Coupon APIs (Blueprint §7 Coupons)
const express = require('express');
const router = express.Router();
const couponController = require('./couponController');
const couponValidators = require('./couponValidators');
const validate = require('../../shared/middleware/validate');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Public: validate coupon code
router.get('/validate/:code', asyncWrapper(couponController.validateByCode));

// Admin CRUD (mounted under /admin in app.js)
router.get('/', asyncWrapper(couponController.list));
router.post('/', validate(couponValidators.create), asyncWrapper(couponController.create));
router.put('/:id', asyncWrapper(couponController.update));
router.delete('/:id', asyncWrapper(couponController.remove));

module.exports = router;
