// Express Router for Notification APIs (Blueprint §7 Notifications)
const express = require('express');
const router = express.Router();
const notificationController = require('./notificationController');
const auth = require('../../shared/middleware/auth');
const asyncWrapper = require('../../shared/middleware/asyncWrapper');

router.get('/', auth, asyncWrapper(notificationController.list));
router.put('/:id/read', auth, asyncWrapper(notificationController.markRead));
router.put('/read-all', auth, asyncWrapper(notificationController.markAllRead));

module.exports = router;
