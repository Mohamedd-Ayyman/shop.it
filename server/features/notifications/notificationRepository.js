// Notification repository — DB operations for notification feature
const Notification = require('./notificationModel');

module.exports = {
  findByUser(userId, { page, pageSize, unreadOnly }) {
    const query = { user: userId };
    if (unreadOnly) query.isRead = false;
    const skip = (page - 1) * pageSize;
    return Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean(),
      Notification.countDocuments(query),
    ]);
  },
  create(data) { return Notification.create(data); },
  markAsRead(id) { return Notification.findByIdAndUpdate(id, { isRead: true }); },
  markAllAsRead(userId) { return Notification.updateMany({ user: userId, isRead: false }, { isRead: true }); },
  unreadCount(userId) { return Notification.countDocuments({ user: userId, isRead: false }); },
};
