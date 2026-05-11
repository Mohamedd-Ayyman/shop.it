// Express Router for Auth APIs (Blueprint §7 Auth)
const express = require('express');
const router = express.Router();
const authController = require('./authController');
const authValidators = require('./authValidators');
const validate = require('../../shared/middleware/validate');
const authLimiter = require('../../shared/middleware/authLimiter');
const auth = require('../../shared/middleware/auth');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Auth routes with rate limiting on sensitive endpoints
router.post('/register', authLimiter, validate(authValidators.register), asyncWrapper(authController.register));
router.post('/login', authLimiter, validate(authValidators.login), asyncWrapper(authController.login));
router.post('/logout', auth, asyncWrapper(authController.logout));
router.post('/forgot-password', authLimiter, validate(authValidators.forgotPassword), asyncWrapper(authController.forgotPassword));
router.post('/reset-password', authLimiter, validate(authValidators.resetPassword), asyncWrapper(authController.resetPassword));
router.post('/refresh', validate(authValidators.refresh), asyncWrapper(authController.refresh));
router.get('/me', auth, asyncWrapper(authController.getMe));

module.exports = router;
