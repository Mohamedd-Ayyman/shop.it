// Main Express app setup (Blueprint §5 Architecture)
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./shared/config/config');

// Security
app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

// Global rate limit
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Health
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));

// --- API v1 Routes ---
const auth = require('./shared/middleware/auth');
const rbac = require('./shared/middleware/rbac');

const api = express.Router();

// Public & customer routes
api.use('/auth', require('./features/auth/authRoutes'));
api.use('/users', require('./features/users/userRoutes'));
api.use('/products', require('./features/products/productRoutes'));
api.use('/categories', require('./features/categories/categoryRoutes'));
api.use('/cart', require('./features/cart/cartRoutes'));
api.use('/orders', require('./features/orders/orderRoutes'));
api.use('/reviews', require('./features/reviews/reviewRoutes'));
api.use('/notifications', require('./features/notifications/notificationRoutes'));
api.use('/coupons', require('./features/coupons/couponRoutes'));

// Admin routes (Blueprint §7 Admin Endpoints)
const admin = express.Router();
admin.use('/products', require('./features/products/productRoutes'));
admin.use('/categories', require('./features/categories/categoryRoutes'));
admin.use('/orders', require('./features/orders/adminOrderRoutes'));
admin.use('/users', require('./features/users/adminUserRoutes'));
admin.use('/analytics', require('./features/analytics/analyticsRoutes'));
admin.use('/coupons', require('./features/coupons/couponRoutes'));
api.use('/admin', auth, rbac('admin'), admin);

app.use('/api/v1', api);

// Error/404 handlers
app.use(require('./shared/middleware/notFoundHandler'));
app.use(require('./shared/middleware/errorHandler'));

module.exports = app;
