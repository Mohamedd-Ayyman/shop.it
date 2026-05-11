// Express Router for User APIs (Blueprint §7 User/Profile)
const express = require('express');
const router = express.Router();
const userController = require('./userController');
const userValidators = require('./userValidators');
const validate = require('../../shared/middleware/validate');
const auth = require('../../shared/middleware/auth');
const rbac = require('../../shared/middleware/rbac');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

// Customer profile
router.get('/profile', auth, asyncWrapper(userController.getProfile));
router.put('/profile', auth, validate(userValidators.updateProfile), asyncWrapper(userController.updateProfile));
router.put('/password', auth, validate(userValidators.changePassword), asyncWrapper(userController.changePassword));
router.delete('/account', auth, asyncWrapper(userController.deleteAccount));

// Wishlist
router.get('/wishlist', auth, asyncWrapper(userController.getWishlist));
router.post('/wishlist/:productId', auth, asyncWrapper(userController.addToWishlist));
router.delete('/wishlist/:productId', auth, asyncWrapper(userController.removeFromWishlist));

// Admin endpoints
router.get('/', auth, rbac('admin'), asyncWrapper(userController.listUsers));
router.put('/:id', auth, rbac('admin'), asyncWrapper(userController.updateUser));

module.exports = router;
