// Admin user routes (Blueprint §7 Admin Users)
const express = require('express');
const router = express.Router();
const userController = require('./userController');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

router.get('/', asyncWrapper(userController.listUsers));
router.put('/:id', asyncWrapper(userController.updateUser));

module.exports = router;
