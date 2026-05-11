// User validators (express-validator)
const { body } = require('express-validator');

const updateProfile = [
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name 2-50 chars'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
];

const changePassword = [
  body('currentPassword').notEmpty().withMessage('Current password required'),
  body('newPassword').isLength({ min: 8 }).withMessage('New password min 8 chars'),
];

module.exports = { updateProfile, changePassword };
