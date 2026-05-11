// Loads and exports app configuration based on environment variables
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-jwt-secret',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'dev-refresh-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
};

module.exports = config;
