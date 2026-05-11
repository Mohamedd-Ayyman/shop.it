// Express Router for Cart APIs (Blueprint §7 Cart)
const express = require('express');
const router = express.Router();
const cartController = require('./cartController');
const cartValidators = require('./cartValidators');
const validate = require('../../shared/middleware/validate');
const auth = require('../../shared/middleware/auth');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

router.get('/', auth, asyncWrapper(cartController.getCart));
router.post('/items', auth, validate(cartValidators.addItem), asyncWrapper(cartController.addItem));
router.put('/items/:itemId', auth, validate(cartValidators.updateItem), asyncWrapper(cartController.updateItem));
router.delete('/items/:itemId', auth, asyncWrapper(cartController.removeItem));
router.post('/coupon', auth, validate(cartValidators.applyCoupon), asyncWrapper(cartController.applyCoupon));
router.delete('/coupon', auth, asyncWrapper(cartController.removeCoupon));

module.exports = router;
