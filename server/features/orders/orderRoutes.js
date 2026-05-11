// Express Router for Order APIs (Blueprint §7 Orders)
const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const orderValidators = require('./orderValidators');
const validate = require('../../shared/middleware/validate');
const auth = require('../../shared/middleware/auth');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Customer routes
router.post('/', auth, validate(orderValidators.create), asyncWrapper(orderController.place));
router.get('/', auth, asyncWrapper(orderController.listMine));
router.get('/:orderNumber', auth, asyncWrapper(orderController.getByOrderNumber));
router.put('/:orderNumber/cancel', auth, asyncWrapper(orderController.cancel));

module.exports = router;
