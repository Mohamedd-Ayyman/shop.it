const mongoose = require('mongoose');

const orderItemSchema = {
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String },
  image: { type: String },
  price: { type: Number },
  size: { type: String },
  color: { type: String },
  quantity: { type: Number }
};

const statusHistorySchema = {
  status: String,
  timestamp: { type: Date, default: Date.now },
  note: String
};

const shippingAddressSchema = {
  name: String, street: String, city: String, state: String, zipCode: String, country: String
};

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending','processing','shipped','delivered','cancelled'], default: 'pending' },
  shippingAddress: shippingAddressSchema,
  shippingMethod: { type: String, enum: ['standard','express','overnight'] },
  trackingNumber: { type: String, default: null },
  paymentMethod: { type: String, default: 'card' },
  paymentStatus: { type: String, enum: ['pending','paid','refunded','failed'], default: 'paid' },
  couponCode: { type: String, default: null },
  statusHistory: [statusHistorySchema],
  notes: { type: String, default: null },
},
{ timestamps: true }
);

orderSchema.index({ orderNumber: 1 }, { unique: true });
orderSchema.index({ user: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Order', orderSchema);
