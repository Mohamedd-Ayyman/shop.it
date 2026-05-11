// User API route handlers (Blueprint §7 User/Profile)
const userService = require('./userService');

module.exports = {
  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(req.user._id);
      res.json({ success: true, user });
    } catch (err) { next(err); }
  },

  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateProfile(req.user._id, req.body);
      res.json({ success: true, user });
    } catch (err) { next(err); }
  },

  async changePassword(req, res, next) {
    try {
      await userService.changePassword(req.user._id, req.body);
      res.json({ success: true, message: 'Password updated' });
    } catch (err) { next(err); }
  },

  async deleteAccount(req, res, next) {
    try {
      await userService.deleteAccount(req.user._id);
      res.json({ success: true, message: 'Account deactivated' });
    } catch (err) { next(err); }
  },

  async getWishlist(req, res, next) {
    try {
      const wishlist = await userService.getWishlist(req.user._id);
      res.json({ success: true, products: wishlist });
    } catch (err) { next(err); }
  },

  async addToWishlist(req, res, next) {
    try {
      const user = await userService.addToWishlist(req.user._id, req.params.productId);
      res.json({ success: true, wishlist: user.wishlist });
    } catch (err) { next(err); }
  },

  async removeFromWishlist(req, res, next) {
    try {
      const user = await userService.removeFromWishlist(req.user._id, req.params.productId);
      res.json({ success: true, wishlist: user.wishlist });
    } catch (err) { next(err); }
  },

  // Admin endpoints
  async listUsers(req, res, next) {
    try {
      const { users, total } = await userService.listUsers(req.query);
      res.json({ success: true, users, total, page: Number(req.query.page) || 1, pages: Math.ceil(total / (Number(req.query.limit) || 20)) });
    } catch (err) { next(err); }
  },

  async updateUser(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json({ success: true, user });
    } catch (err) { next(err); }
  },
};
