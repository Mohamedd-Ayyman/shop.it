// Product validators (express-validator)
const { body } = require('express-validator');

const create = [
  body('name').trim().isLength({ max: 200 }).withMessage('Name required'),
  body('slug').trim().isSlug().withMessage('Valid slug required'),
  body('description').notEmpty().withMessage('Description required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('category').isMongoId().withMessage('Valid category ID required'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be >= 0'),
];

const update = [
  body('name').optional().trim().isLength({ max: 200 }),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
];

module.exports = { create, update };
