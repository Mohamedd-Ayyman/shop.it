// Analytics API route handlers (Blueprint §7 Admin Analytics)
const analyticsService = require('./analyticsService');

module.exports = {
  async getStats(req, res, next) {
    try {
      const days = Number(req.query.period) || 30;
      const [stats, revenueData, topProducts, orderStatusBreakdown] = await Promise.all([
        analyticsService.dashboardStats(),
        analyticsService.revenueChart(days),
        analyticsService.topProducts(),
        analyticsService.orderStatusBreakdown(),
      ]);
      res.json({ success: true, ...stats, revenueData, topProducts, orderStatusBreakdown });
    } catch (err) { next(err); }
  },
};
