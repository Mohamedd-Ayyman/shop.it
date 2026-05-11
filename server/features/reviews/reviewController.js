// Review API route handlers (Blueprint §7 Reviews)
const reviewService = require('./reviewService');

module.exports = {
  async create(req, res, next) {
    try {
      const review = await reviewService.create(req.user._id, req.body);
      res.status(201).json({ success: true, review });
    } catch (err) { next(err); }
  },

  async listByProductSlug(req, res, next) {
    try {
      const { reviews, total, averageRating } = await reviewService.listByProductSlug(req.params.slug, req.query);
      res.json({ success: true, reviews, total, averageRating, page: Number(req.query.page) || 1 });
    } catch (err) { next(err); }
  },
};
