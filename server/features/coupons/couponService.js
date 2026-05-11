// Coupon service (Blueprint §7 Coupons)
const couponRepo = require('./couponRepository');

module.exports = {
  async create(data) { return couponRepo.create(data); },
  async list() { return couponRepo.list(); },
  async update(id, data) { return couponRepo.update(id, data); },
  async remove(id) { return couponRepo.deleteOne(id); },

  async validate(code) {
    const coupon = await couponRepo.findByCode(code);
    if (!coupon) { const e = new Error('Coupon not found'); e.status = 404; throw e; }
    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) { const e = new Error('Coupon expired or not active'); e.status = 400; throw e; }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) { const e = new Error('Coupon usage limit reached'); e.status = 400; throw e; }
    if (!coupon.isActive) { const e = new Error('Coupon not active'); e.status = 400; throw e; }
    return coupon;
  },
};
