// Cart repository — DB operations for cart feature
const Cart = require('./cartModel');

module.exports = {
  findByUser(userId) { return Cart.findOne({ user: userId }).populate('items.product'); },
  create(userId) { return Cart.create({ user: userId, items: [] }); },
  save(cart) { return cart.save(); },
};
