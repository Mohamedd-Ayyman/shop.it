// Category repository — DB operations for category feature
const Category = require('./categoryModel');

module.exports = {
  findById(id) { return Category.findById(id); },
  findBySlug(slug) { return Category.findOne({ slug, isActive: true }); },
  list() { return Category.find({ isActive: true }).sort({ order: 1, name: 1 }).lean(); },
  create(data) { return Category.create(data); },
  update(id, data) { return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true }); },
  softDelete(id) { return Category.findByIdAndUpdate(id, { isActive: false }, { new: true }); },
  productCount(id) { return require('../products/productModel').countDocuments({ category: id, isActive: true }); },
};
