// Category validators (express-validator)
const { body } = require('express-validator');

const create = [
  body('name').trim().isLength({ min: 1, max: 50 }).withMessage('Name 1-50 chars'),
  body('slug').trim().isSlug().withMessage('Valid slug required'),
];

const update = [
  body('name').optional().trim().isLength({ max: 50 }),
  body('slug').optional().trim().isSlug(),
];

module.exports = { create, update };
