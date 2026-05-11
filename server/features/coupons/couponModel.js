const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, enum: ['percentage','fixed','freeShipping'], required: true },
  value: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  maxDiscount: { type: Number, default: null },
  usageLimit: { type: Number, default: null },
  usedCount: { type: Number, default: 0 },
  perUserLimit: { type: Number, default: 1 },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
},
{ timestamps: { createdAt: true, updatedAt: false } }
);

couponSchema.index({ code: 1 }, { unique: true });
couponSchema.index({ isActive: 1 });
couponSchema.index({ validUntil: 1 });

module.exports = mongoose.model('Coupon', couponSchema);
