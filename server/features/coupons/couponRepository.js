// Coupon repository — DB operations for coupon feature
const Coupon = require('./couponModel');

module.exports = {
  findByCode(code) { return Coupon.findOne({ code: code.toUpperCase() }); },
  list() { return Coupon.find().sort({ createdAt: -1 }).lean(); },
  create(data) { return Coupon.create(data); },
  update(id, data) { return Coupon.findByIdAndUpdate(id, data, { new: true, runValidators: true }); },
  deleteOne(id) { return Coupon.findByIdAndDelete(id); },
  incrementUsed(code) { return Coupon.findOneAndUpdate({ code: code.toUpperCase() }, { $inc: { usedCount: 1 } }); },
};
