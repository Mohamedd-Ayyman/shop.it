// User service (Blueprint §7 User/Profile)
const userRepo = require('./userRepository');
const passwordUtil = require('../../shared/utils/password');

module.exports = {
  async getProfile(userId) {
    return userRepo.findById(userId).select('-password');
  },

  async updateProfile(userId, data) {
    const updates = {};
    if (data.name) updates.name = data.name;
    if (data.email) updates.email = data.email;
    if (data.phone) updates.phone = data.phone;
    return userRepo.findByIdAndUpdate(userId, updates);
  },

  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await userRepo.findById(userId);
    const ok = await passwordUtil.compare(currentPassword, user.password);
    if (!ok) { const e = new Error('Current password incorrect'); e.status = 401; throw e; }
    const hashed = await passwordUtil.hash(newPassword);
    await userRepo.updatePassword(userId, hashed);
  },

  async deleteAccount(userId) {
    await userRepo.deleteAccount(userId);
  },

  async getWishlist(userId) {
    const user = await userRepo.getWishlist(userId);
    return user.wishlist || [];
  },

  async addToWishlist(userId, productId) {
    const user = await userRepo.addToWishlist(userId, productId);
    return user;
  },

  async removeFromWishlist(userId, productId) {
    const user = await userRepo.removeFromWishlist(userId, productId);
    return user;
  },

  async listUsers(query) {
    const page = Math.max(Number(query.page) || 1, 1);
    const pageSize = Math.max(Number(query.limit) || 20, 1);
    const [users, total] = await userRepo.list({ page, pageSize, search: query.search, role: query.role });
    return { users, total };
  },

  async updateUser(id, data) {
    return userRepo.updateRole(id, data.role);
  },
};
