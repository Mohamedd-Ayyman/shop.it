// Admin order routes (Blueprint §7 Admin Orders)
const express = require('express');
const router = express.Router();
const orderController = require('./orderController');
const orderValidators = require('./orderValidators');
const validate = require('../../shared/middleware/validate');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

router.get('/', asyncWrapper(orderController.listAll));
router.get('/:orderNumber', asyncWrapper(orderController.getByOrderNumber));
router.put('/:orderNumber/status', validate(orderValidators.updateStatus), asyncWrapper(orderController.updateStatus));
router.put('/:orderNumber/refund', asyncWrapper(orderController.refundOrder));

module.exports = router;
