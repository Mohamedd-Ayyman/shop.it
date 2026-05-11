// Review repository — DB operations for review feature
const Review = require('./reviewModel');

module.exports = {
  findByProduct(productId, { page, pageSize, sort }) {
    const skip = (page - 1) * pageSize;
    let sortOpt = sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
    return Promise.all([
      Review.find({ product: productId }).sort(sortOpt).skip(skip).limit(pageSize).populate('user', 'name avatar'),
      Review.countDocuments({ product: productId }),
    ]);
  },
  findOneByUserAndProduct(userId, productId) { return Review.findOne({ user: userId, product: productId }); },
  create(data) { return Review.create(data); },
};
