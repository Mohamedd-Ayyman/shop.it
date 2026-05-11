// Notification service (Blueprint §7 Notifications)
const notifRepo = require('./notificationRepository');

module.exports = {
  async list(userId, query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 20, 1);
    const [notifications, total] = await notifRepo.findByUser(userId, { page, pageSize, unreadOnly: query.unreadOnly === 'true' });
    const unreadCount = await notifRepo.unreadCount(userId);
    return { notifications, total, unreadCount };
  },
  async markAsRead(id) { return notifRepo.markAsRead(id); },
  async markAllAsRead(userId) { return notifRepo.markAllAsRead(userId); },
};
