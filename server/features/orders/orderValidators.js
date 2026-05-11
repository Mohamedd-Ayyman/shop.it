// Order validators (express-validator)
const { body } = require('express-validator');

const create = [
  body('shippingAddress').isObject().withMessage('Shipping address required'),
  body('shippingAddress.street').notEmpty(),
  body('shippingAddress.city').notEmpty(),
  body('shippingAddress.state').notEmpty(),
  body('shippingAddress.zipCode').notEmpty(),
  body('shippingMethod').isIn(['standard', 'express', 'overnight']).withMessage('Valid shipping method required'),
];

const updateStatus = [
  body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']).withMessage('Valid status required'),
];

module.exports = { create, updateStatus };
