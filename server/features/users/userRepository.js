// User repository — DB operations for user feature
const User = require('./userModel');

module.exports = {
  findById(id) { return User.findById(id); },
  findByIdAndUpdate(id, data) { return User.findByIdAndUpdate(id, data, { new: true, runValidators: true }); },
  updatePassword(id, hash) { return User.findByIdAndUpdate(id, { password: hash }); },
  deleteAccount(id) { return User.findByIdAndUpdate(id, { isActive: false }); },
  addToWishlist(userId, productId) { return User.findByIdAndUpdate(userId, { $addToSet: { wishlist: productId } }, { new: true }); },
  removeFromWishlist(userId, productId) { return User.findByIdAndUpdate(userId, { $pull: { wishlist: productId } }, { new: true }); },
  getWishlist(userId) { return User.findById(userId).populate('wishlist'); },
  // Admin
  list({ page, pageSize, search, role }) {
    const query = {};
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];
    if (role) query.role = role;
    const skip = (page - 1) * pageSize;
    return Promise.all([
      User.find(query).select('-password').skip(skip).limit(pageSize),
      User.countDocuments(query),
    ]);
  },
  updateRole(id, role) { return User.findByIdAndUpdate(id, { role }, { new: true }); },
};
