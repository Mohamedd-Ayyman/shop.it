// Category API route handlers (Blueprint §7 Categories)
const categoryService = require('./categoryService');

module.exports = {
  async list(req, res, next) {
    try {
      const categories = await categoryService.list();
      res.json({ success: true, categories });
    } catch (err) { next(err); }
  },

  async getBySlug(req, res, next) {
    try {
      const category = await categoryService.getBySlug(req.params.slug);
      res.json({ success: true, category });
    } catch (err) { next(err); }
  },

  async create(req, res, next) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({ success: true, category });
    } catch (err) { next(err); }
  },

  async update(req, res, next) {
    try {
      const category = await categoryService.update(req.params.id, req.body);
      res.json({ success: true, category });
    } catch (err) { next(err); }
  },

  async remove(req, res, next) {
    try {
      await categoryService.remove(req.params.id);
      res.json({ success: true, message: 'Category deleted' });
    } catch (err) { next(err); }
  },
};
