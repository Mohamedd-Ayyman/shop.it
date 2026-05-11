// Cart API route handlers (Blueprint §7 Cart)
const cartService = require('./cartService');

module.exports = {
  async getCart(req, res, next) {
    try {
      const cart = await cartService.getCart(req.user._id);
      res.json({ success: true, cart });
    } catch (err) { next(err); }
  },

  async addItem(req, res, next) {
    try {
      const cart = await cartService.addItem(req.user._id, req.body);
      res.json({ success: true, cart });
    } catch (err) { next(err); }
  },

  async updateItem(req, res, next) {
    try {
      const cart = await cartService.updateItem(req.user._id, req.params.itemId, req.body.quantity);
      res.json({ success: true, cart });
    } catch (err) { next(err); }
  },

  async removeItem(req, res, next) {
    try {
      const cart = await cartService.removeItem(req.user._id, req.params.itemId);
      res.json({ success: true, cart });
    } catch (err) { next(err); }
  },

  async applyCoupon(req, res, next) {
    try {
      const result = await cartService.applyCoupon(req.user._id, req.body.code);
      res.json({ success: true, cart: result.cart, coupon: result.coupon });
    } catch (err) { next(err); }
  },

  async removeCoupon(req, res, next) {
    try {
      const cart = await cartService.removeCoupon(req.user._id);
      res.json({ success: true, cart });
    } catch (err) { next(err); }
  },
};
