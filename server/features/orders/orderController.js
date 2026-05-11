// Order API route handlers (Blueprint §7 Orders)
const orderService = require('./orderService');

module.exports = {
  // Customer
  async place(req, res, next) {
    try {
      const order = await orderService.place(req.user._id, req.body);
      res.status(201).json({ success: true, order });
    } catch (err) { next(err); }
  },

  async listMine(req, res, next) {
    try {
      const { orders, total } = await orderService.listByUser(req.user._id, req.query);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res.json({ success: true, orders, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { next(err); }
  },

  async getByOrderNumber(req, res, next) {
    try {
      const order = await orderService.getByOrderNumber(req.params.orderNumber);
      if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden' });
      }
      res.json({ success: true, order });
    } catch (err) { next(err); }
  },

  async cancel(req, res, next) {
    try {
      const order = await orderService.cancel(req.params.orderNumber, req.user._id);
      res.json({ success: true, order });
    } catch (err) { next(err); }
  },

  // Admin
  async listAll(req, res, next) {
    try {
      const { orders, total } = await orderService.listAll(req.query);
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      res.json({ success: true, orders, total, page, pages: Math.ceil(total / limit) });
    } catch (err) { next(err); }
  },

  async getByOrderNumberAdmin(req, res, next) {
    try {
      const order = await orderService.getByOrderNumber(req.params.orderNumber);
      res.json({ success: true, order });
    } catch (err) { next(err); }
  },

  async updateStatus(req, res, next) {
    try {
      const order = await orderService.updateStatus(req.params.orderNumber, req.body);
      res.json({ success: true, order });
    } catch (err) { next(err); }
  },

  async refundOrder(req, res, next) {
    try {
      const order = await orderService.refund(req.params.orderNumber);
      res.json({ success: true, order });
    } catch (err) { next(err); }
  },
};
