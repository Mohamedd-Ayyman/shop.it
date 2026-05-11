// Auth repository — DB operations for auth feature
const User = require('../users/userModel');

module.exports = {
  findByEmail(email) { return User.findOne({ email }); },
  findById(id) { return User.findById(id); },
  create(data) { return User.create(data); },
  updateRefreshToken(id, token) { return User.findByIdAndUpdate(id, { refreshToken: token }); },
  incrementFailedAttempts(id) { return User.findByIdAndUpdate(id, { $inc: { failedLoginAttempts: 1 } }); },
  lockAccount(id, until) { return User.findByIdAndUpdate(id, { lockedUntil: until }); },
  unlockAccount(id) { return User.findByIdAndUpdate(id, { failedLoginAttempts: 0, lockedUntil: null }); },
};
