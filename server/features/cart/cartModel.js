const mongoose = require('mongoose');

const cartItemSchema = {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number, required: true, min: 1, max: 99 },
};

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
  couponCode: { type: String, default: null },
  couponDiscount: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

cartSchema.index({ user: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
