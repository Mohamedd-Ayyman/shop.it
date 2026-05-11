// Coupon validators (express-validator)
const { body } = require('express-validator');

const create = [
  body('code').trim().notEmpty().withMessage('Code required'),
  body('type').isIn(['percentage', 'fixed', 'freeShipping']).withMessage('Valid type required'),
  body('value').isFloat({ min: 0 }).withMessage('Value must be >= 0'),
  body('validFrom').isISO8601().withMessage('Valid start date required'),
  body('validUntil').isISO8601().withMessage('Valid end date required'),
];

module.exports = { create };
