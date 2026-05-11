// Cart service (Blueprint §7 Cart)
const cartRepo = require('./cartRepository');
const productRepo = require('../products/productRepository');
const couponRepo = require('../coupons/couponRepository');

module.exports = {
  async getCart(userId) { return cartRepo.findByUser(userId); },

  async addItem(userId, { productId, quantity = 1, size, color }) {
    let cart = await cartRepo.findByUser(userId);
    if (!cart) cart = await cartRepo.create(userId);
    const product = await productRepo.findById(productId);
    if (!product || !product.isActive) { const e = new Error('Product not found'); e.status = 404; throw e; }
    if (product.stock < quantity) { const e = new Error('Insufficient stock'); e.status = 400; throw e; }
    const existing = cart.items.find(i => i.product.toString() === productId);
    if (existing) existing.quantity = quantity;
    else cart.items.push({ product: productId, name: product.name, image: product.images?.[0]?.url, price: product.salePrice || product.price, quantity, size, color });
    return cartRepo.save(cart);
  },

  async updateItem(userId, itemId, quantity) {
    const cart = await cartRepo.findByUser(userId);
    if (!cart) { const e = new Error('Cart not found'); e.status = 404; throw e; }
    const item = cart.items.id(itemId);
    if (!item) { const e = new Error('Item not found'); e.status = 404; throw e; }
    item.quantity = quantity;
    return cartRepo.save(cart);
  },

  async removeItem(userId, itemId) {
    const cart = await cartRepo.findByUser(userId);
    if (!cart) { const e = new Error('Cart not found'); e.status = 404; throw e; }
    cart.items = cart.items.filter(i => i._id.toString() !== itemId);
    return cartRepo.save(cart);
  },

  async applyCoupon(userId, code) {
    const coupon = await couponRepo.findByCode(code);
    if (!coupon) { const e = new Error('Coupon not found'); e.status = 404; throw e; }
    const now = new Date();
    if (coupon.validFrom > now || coupon.validUntil < now) { const e = new Error('Coupon expired or not active'); e.status = 400; throw e; }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) { const e = new Error('Coupon usage limit reached'); e.status = 400; throw e; }
    let cart = await cartRepo.findByUser(userId);
    if (!cart) { const e = new Error('Cart not found'); e.status = 404; throw e; }
    cart.couponCode = coupon.code;
    cart.couponDiscount = coupon.type === 'percentage' ? (cart.items.reduce((s, i) => s + i.price * i.quantity, 0) * coupon.value / 100) : coupon.value;
    return { cart: await cartRepo.save(cart), coupon };
  },

  async removeCoupon(userId) {
    let cart = await cartRepo.findByUser(userId);
    if (!cart) { const e = new Error('Cart not found'); e.status = 404; throw e; }
    cart.couponCode = null;
    cart.couponDiscount = 0;
    return cartRepo.save(cart);
  },
};
