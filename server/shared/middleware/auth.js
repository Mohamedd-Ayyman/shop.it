// JWT Auth middleware (Blueprint §12 Auth)
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../../features/users/userModel');

module.exports = async function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Authentication required' });
  }
  const token = header.replace('Bearer ', '').trim();
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded._id).select('-password').lean();
    if (!user) throw new Error('User not found');
    if (!user.isActive) return res.status(403).json({ success: false, message: 'Account disabled' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
