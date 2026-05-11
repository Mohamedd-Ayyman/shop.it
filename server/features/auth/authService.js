// Service functions for authentication (Blueprint §7 Auth)
const crypto = require('crypto');
const authRepo = require('./authRepository');
const jwtUtil = require('../../shared/utils/jwt');
const passwordUtil = require('../../shared/utils/password');
const config = require('../../shared/config/config');

// Lock config
const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

module.exports = {
  async register({ name, email, password }) {
    const existing = await authRepo.findByEmail(email);
    if (existing) { const e = new Error('Email already registered'); e.status = 409; throw e; }
    const hashed = await passwordUtil.hash(password);
    const user = await authRepo.create({ name, email, password: hashed });
    const accessToken = jwtUtil.createToken({ _id: user._id, role: user.role });
    const refreshToken = jwtUtil.createRefreshToken({ _id: user._id });
    await authRepo.updateRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
  },

  async login({ email, password }) {
    const user = await authRepo.findByEmail(email);
    if (!user) { const e = new Error('Invalid credentials'); e.status = 401; throw e; }
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      const e = new Error(`Account locked. Try again in ${Math.ceil((user.lockedUntil - new Date()) / 60000)} minutes.`);
      e.status = 403; throw e;
    }
    if (!user.isActive) { const e = new Error('Account disabled'); e.status = 403; throw e; }
    const ok = await passwordUtil.compare(password, user.password);
    if (!ok) {
      await authRepo.incrementFailedAttempts(user._id);
      if (user.failedLoginAttempts + 1 >= MAX_FAILED) {
        const until = new Date(Date.now() + LOCK_MINUTES * 60 * 1000);
        await authRepo.lockAccount(user._id, until);
      }
      const e = new Error('Invalid credentials'); e.status = 401; throw e;
    }
    await authRepo.unlockAccount(user._id);
    const accessToken = jwtUtil.createToken({ _id: user._id, role: user.role });
    const refreshToken = jwtUtil.createRefreshToken({ _id: user._id });
    await authRepo.updateRefreshToken(user._id, refreshToken);
    return { user, accessToken, refreshToken };
  },

  async logout(userId) {
    await authRepo.updateRefreshToken(userId, null);
  },

  async forgotPassword(email) {
    const user = await authRepo.findByEmail(email);
    if (!user) return; // silent
    const token = crypto.randomBytes(32).toString('hex');
    // In MVP, just log to console
    console.log(`[Forgot Password] Token for ${email}: ${token}`);
    // TODO: store hashed token in DB with expiry
  },

  async resetPassword(token, password) {
    // TODO: verify token from DB
    console.log(`[Reset Password] Token ${token} used for reset`);
    // MVP: no-op
  },

  async refresh(token) {
    const decoded = jwtUtil.verifyRefreshToken(token);
    const user = await authRepo.findById(decoded._id);
    if (!user || user.refreshToken !== token) {
      const e = new Error('Invalid refresh token'); e.status = 401; throw e;
    }
    const accessToken = jwtUtil.createToken({ _id: user._id, role: user.role });
    const newRefreshToken = jwtUtil.createRefreshToken({ _id: user._id });
    await authRepo.updateRefreshToken(user._id, newRefreshToken);
    return { accessToken, refreshToken: newRefreshToken };
  },
};
