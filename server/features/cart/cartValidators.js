// Cart validators (express-validator)
const { body } = require('express-validator');

const addItem = [
  body('productId').isMongoId().withMessage('Valid product ID required'),
  body('quantity').optional().isInt({ min: 1, max: 99 }).withMessage('Quantity 1-99'),
];

const updateItem = [
  body('quantity').isInt({ min: 1, max: 99 }).withMessage('Quantity 1-99'),
];

const applyCoupon = [
  body('code').trim().notEmpty().withMessage('Coupon code required'),
];

module.exports = { addItem, updateItem, applyCoupon };
