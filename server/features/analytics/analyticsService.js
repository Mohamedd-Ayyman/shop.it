// Analytics service (Blueprint §7 Admin Analytics)
const Order = require('../orders/orderModel');
const Product = require('../products/productModel');
const User = require('../users/userModel');

module.exports = {
  async dashboardStats() {
    const totalOrders = await Order.countDocuments();
    const totalRevenue = (await Order.aggregate([{ $group: { _id: null, sum: { $sum: '$total' } } }]))[0]?.sum || 0;
    const totalProducts = await Product.countDocuments({ isActive: true });
    const totalUsers = await User.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).lean();
    return { totalOrders, totalRevenue, totalProducts, totalUsers, recentOrders };
  },

  async revenueChart(days = 30) {
    const since = new Date(Date.now() - days * 86400000);
    return Order.aggregate([
      { $match: { createdAt: { $gte: since }, paymentStatus: 'paid' } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, revenue: { $sum: '$total' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
  },

  async topProducts(limit = 5) {
    return Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: '$items.name', quantity: { $sum: '$items.quantity' }, revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } } } },
      { $sort: { revenue: -1 } },
      { $limit: limit },
    ]);
  },

  async orderStatusBreakdown() {
    return Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  },
};
