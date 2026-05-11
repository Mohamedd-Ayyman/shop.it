// JWT Utility (Blueprint §12 Auth)
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {
  createToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn || '15m' });
  },
  verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
  },
  createRefreshToken(payload) {
    return jwt.sign(payload, config.jwtRefreshSecret || config.jwtSecret, { expiresIn: config.jwtRefreshExpiresIn || '7d' });
  },
  verifyRefreshToken(token) {
    return jwt.verify(token, config.jwtRefreshSecret || config.jwtSecret);
  },
};
