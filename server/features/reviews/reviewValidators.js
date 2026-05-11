// Review validators (express-validator)
const { body } = require('express-validator');

const create = [
  body('productId').isMongoId().withMessage('Valid product ID required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1-5 required'),
  body('title').optional().trim().isLength({ max: 100 }),
  body('comment').optional().trim().isLength({ max: 1000 }),
];

module.exports = { create };
