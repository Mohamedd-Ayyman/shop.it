// Product repository — DB operations for product feature
const Product = require('./productModel');

module.exports = {
  findById(id) { return Product.findById(id); },
  findBySlug(slug) { return Product.findOne({ slug, isActive: true }); },
  featured() { return Product.find({ isActive: true, isFeatured: true }).limit(8); },
  related(product) { return Product.find({ category: product.category, _id: { $ne: product._id }, isActive: true }).limit(4); },
  list({ page, pageSize, q, category, priceMin, priceMax, tag, sort, inStock, minRating }) {
    const query = { isActive: true };
    if (q) query.$or = [{ name: { $regex: q, $options: 'i' } }, { description: { $regex: q, $options: 'i' } }];
    if (category) query.category = category;
    if (priceMin || priceMax) { query.price = {}; if (priceMin) query.price.$gte = Number(priceMin); if (priceMax) query.price.$lte = Number(priceMax); }
    if (tag) query.tags = tag;
    if (inStock === 'true') query.stock = { $gt: 0 };
    if (minRating) query.rating = { $gte: Number(minRating) };
    let sortOpt = {};
    if (sort === 'price_asc') sortOpt = { price: 1 };
    else if (sort === 'price_desc') sortOpt = { price: -1 };
    else if (sort === 'newest') sortOpt = { createdAt: -1 };
    else if (sort === 'rating') sortOpt = { rating: -1 };
    else sortOpt = { isFeatured: -1, createdAt: -1 };
    const skip = (page - 1) * pageSize;
    return Promise.all([
      Product.find(query).sort(sortOpt).skip(skip).limit(pageSize).lean(),
      Product.countDocuments(query),
    ]);
  },
  create(data) { return Product.create(data); },
  update(id, data) { return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }); },
  softDelete(id) { return Product.findByIdAndUpdate(id, { isActive: false }, { new: true }); },
};
