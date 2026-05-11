// Auth API route handlers (Blueprint §7 Auth)
const authService = require('./authService');

module.exports = {
  async register(req, res, next) {
    try {
      const { user, accessToken, refreshToken } = await authService.register(req.body);
      res.status(201).json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        accessToken, refreshToken,
      });
    } catch (err) { next(err); }
  },

  async login(req, res, next) {
    try {
      const { user, accessToken, refreshToken } = await authService.login(req.body);
      res.json({
        success: true,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
        accessToken, refreshToken,
      });
    } catch (err) { next(err); }
  },

  async logout(req, res, next) {
    try {
      await authService.logout(req.user._id);
      res.json({ success: true, message: 'Logged out' });
    } catch (err) { next(err); }
  },

  async forgotPassword(req, res, next) {
    try {
      await authService.forgotPassword(req.body.email);
      res.json({ success: true, message: 'Reset link sent (check console)' });
    } catch (err) { next(err); }
  },

  async resetPassword(req, res, next) {
    try {
      await authService.resetPassword(req.body.token, req.body.password);
      res.json({ success: true, message: 'Password reset successful' });
    } catch (err) { next(err); }
  },

  async refresh(req, res, next) {
    try {
      const tokens = await authService.refresh(req.body.refreshToken);
      res.json({ success: true, ...tokens });
    } catch (err) { next(err); }
  },

  async getMe(req, res, next) {
    res.json({ success: true, user: req.user });
  },
};
