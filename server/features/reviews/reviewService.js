// Review service (Blueprint §7 Reviews)
const reviewRepo = require('./reviewRepository');
const productRepo = require('../products/productRepository');

module.exports = {
  async create(userId, { productId, rating, title, comment }) {
    const product = await productRepo.findById(productId);
    if (!product || !product.isActive) { const e = new Error('Product not found'); e.status = 404; throw e; }
    const existing = await reviewRepo.findOneByUserAndProduct(userId, productId);
    if (existing) { const e = new Error('Already reviewed this product'); e.status = 400; throw e; }
    return reviewRepo.create({ user: userId, product: productId, rating, title, comment });
  },

  async listByProductSlug(slug, query) {
    const product = await productRepo.findBySlug(slug);
    if (!product) { const e = new Error('Product not found'); e.status = 404; throw e; }
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 5, 1);
    const [reviews, total] = await reviewRepo.findByProduct(product._id, { page, pageSize, sort: query.sort });
    const averageRating = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
    return { reviews, total, averageRating };
  },
};
