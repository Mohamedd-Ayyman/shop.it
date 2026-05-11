// Order repository — DB operations for order feature
const Order = require('./orderModel');

module.exports = {
  findByOrderNumber(on) { return Order.findOne({ orderNumber: on }); },
  findById(id) { return Order.findById(id); },
  listByUser(userId, { page, pageSize, status }) {
    const query = { user: userId };
    if (status) query.status = status;
    const skip = (page - 1) * pageSize;
    return Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean(),
      Order.countDocuments(query),
    ]);
  },
  listAll({ page, pageSize, status }) {
    const query = {};
    if (status) query.status = status;
    const skip = (page - 1) * pageSize;
    return Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize).lean(),
      Order.countDocuments(query),
    ]);
  },
  create(data) { return Order.create(data); },
  updateStatus(id, status, note) {
    return Order.findByIdAndUpdate(id, { $set: { status }, $push: { statusHistory: { status, note, timestamp: new Date() } } }, { new: true });
  },
};
