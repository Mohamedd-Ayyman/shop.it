// Coupon API route handlers (Blueprint §7 Coupons)
const couponService = require('./couponService');

module.exports = {
  // Admin
  async create(req, res, next) {
    try {
      const coupon = await couponService.create(req.body);
      res.status(201).json({ success: true, coupon });
    } catch (err) { next(err); }
  },
  async list(req, res, next) {
    try {
      const coupons = await couponService.list();
      res.json({ success: true, coupons });
    } catch (err) { next(err); }
  },
  async update(req, res, next) {
    try {
      const coupon = await couponService.update(req.params.id, req.body);
      res.json({ success: true, coupon });
    } catch (err) { next(err); }
  },
  async remove(req, res, next) {
    try {
      await couponService.remove(req.params.id);
      res.json({ success: true, message: 'Coupon deleted' });
    } catch (err) { next(err); }
  },
  // Public: validate
  async validateByCode(req, res, next) {
    try {
      const coupon = await couponService.validate(req.params.code);
      res.json({ success: true, coupon });
    } catch (err) { next(err); }
  },
};
