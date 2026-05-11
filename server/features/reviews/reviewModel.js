const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, maxLength: 100 },
  comment: { type: String, maxLength: 1000 },
  isVerifiedPurchase: { type: Boolean, default: false },
  isModerated: { type: Boolean, default: true },
  helpfulCount: { type: Number, default: 0 },
},
{ timestamps: { createdAt: true, updatedAt: false } }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });
reviewSchema.index({ product: 1 });
reviewSchema.index({ rating: 1 });

// Aggregate and update product rating/reviewCount after save/remove
reviewSchema.post('save', async function(doc) {
  const Product = require('../products/productModel');
  const agg = await this.constructor.aggregate([
    { $match: { product: doc.product } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  await Product.findByIdAndUpdate(doc.product, {
    rating: agg[0]?.avgRating || 0,
    reviewCount: agg[0]?.count || 0
  });
});
reviewSchema.post('remove', async function(doc) {
  const Product = require('../products/productModel');
  const agg = await this.constructor.aggregate([
    { $match: { product: doc.product } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  await Product.findByIdAndUpdate(doc.product, {
    rating: agg[0]?.avgRating || 0,
    reviewCount: agg[0]?.count || 0
  });
});

module.exports = mongoose.model('Review', reviewSchema);
