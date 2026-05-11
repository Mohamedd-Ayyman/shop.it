// Product controller (Blueprint §7 Products)
const productService = require('./productService');

module.exports = {
  // Public: list with filters, pagination, sort, search
  async list(req, res, next) {
    try {
      const { products, total } = await productService.list(req.query);
      const page = Number(req.query.page) || 1;
      const pageSize = Number(req.query.limit) || 12;
      res.json({ success: true, products, total, page, pages: Math.ceil(total / pageSize), hasNext: page * pageSize < total, hasPrev: page > 1 });
    } catch (err) { next(err); }
  },

  // Public: featured
  async featured(req, res, next) {
    try {
      const products = await productService.featured();
      res.json({ success: true, products });
    } catch (err) { next(err); }
  },

  // Public: by slug
  async getBySlug(req, res, next) {
    try {
      const { product, related } = await productService.getBySlug(req.params.slug);
      res.json({ success: true, product, relatedProducts: related });
    } catch (err) { next(err); }
  },

  // Admin: create
  async create(req, res, next) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ success: true, product });
    } catch (err) { next(err); }
  },

  // Admin: update
  async update(req, res, next) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json({ success: true, product });
    } catch (err) { next(err); }
  },

  // Admin: soft delete
  async remove(req, res, next) {
    try {
      await productService.remove(req.params.id);
      res.json({ success: true, message: 'Product deleted' });
    } catch (err) { next(err); }
  },
};
