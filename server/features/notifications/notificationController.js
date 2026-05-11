// Notification API route handlers (Blueprint §7 Notifications)
const notificationService = require('./notificationService');

module.exports = {
  async list(req, res, next) {
    try {
      const { notifications, total, unreadCount } = await notificationService.list(req.user._id, req.query);
      res.json({ success: true, notifications, total, unreadCount, page: Number(req.query.page) || 1 });
    } catch (err) { next(err); }
  },

  async markRead(req, res, next) {
    try {
      await notificationService.markAsRead(req.params.id, req.user._id);
      res.json({ success: true });
    } catch (err) { next(err); }
  },

  async markAllRead(req, res, next) {
    try {
      await notificationService.markAllAsRead(req.user._id);
      res.json({ success: true });
    } catch (err) { next(err); }
  },
};
