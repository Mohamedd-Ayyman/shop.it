// Auth validators (express-validator)
const { body } = require('express-validator');

const register = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name 2-50 chars'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
];

const login = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
];

const forgotPassword = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
];

const resetPassword = [
  body('token').notEmpty().withMessage('Token required'),
  body('password').isLength({ min: 8 }).withMessage('Password min 8 chars'),
];

const refresh = [
  body('refreshToken').notEmpty().withMessage('Refresh token required'),
];

module.exports = { register, login, forgotPassword, resetPassword, refresh };
