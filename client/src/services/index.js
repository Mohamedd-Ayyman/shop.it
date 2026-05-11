import api from './api'

export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (data) => api.post('/auth/reset-password', data),
  getMe: () => api.get('/auth/me'),
  refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
}

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/password', data),
  deleteAccount: () => api.delete('/users/account'),
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (productId) => api.post(`/users/wishlist/${productId}`),
  removeFromWishlist: (productId) => api.delete(`/users/wishlist/${productId}`),
}

export const productService = {
  list: (params) => api.get('/products', { params }),
  featured: () => api.get('/products/featured'),
  getBySlug: (slug) => api.get(`/products/${slug}`),
}

export const categoryService = {
  list: () => api.get('/categories'),
  getBySlug: (slug) => api.get(`/categories/${slug}`),
}

export const cartService = {
  getCart: () => api.get('/cart'),
  addItem: (data) => api.post('/cart/items', data),
  updateItem: (itemId, quantity) => api.put(`/cart/items/${itemId}`, { quantity }),
  removeItem: (itemId) => api.delete(`/cart/items/${itemId}`),
  applyCoupon: (code) => api.post('/cart/coupon', { code }),
  removeCoupon: () => api.delete('/cart/coupon'),
}

export const orderService = {
  place: (data) => api.post('/orders', data),
  list: (params) => api.get('/orders', { params }),
  getByNumber: (orderNumber) => api.get(`/orders/${orderNumber}`),
  cancel: (orderNumber) => api.put(`/orders/${orderNumber}/cancel`),
}

export const reviewService = {
  create: (data) => api.post('/reviews', data),
  listByProduct: (slug, params) => api.get(`/reviews/product/${slug}`, { params }),
}

export const notificationService = {
  list: (params) => api.get('/notifications', { params }),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
}

export const adminService = {
  // Products
  listProducts: (params) => api.get('/admin/products', { params }),
  createProduct: (data) => api.post('/admin/products', data),
  updateProduct: (id, data) => api.put(`/admin/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/admin/products/${id}`),
  // Categories
  listCategories: () => api.get('/admin/categories'),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (id, data) => api.put(`/admin/categories/${id}`, data),
  deleteCategory: (id) => api.delete(`/admin/categories/${id}`),
  // Orders
  listOrders: (params) => api.get('/admin/orders', { params }),
  getOrder: (orderNumber) => api.get(`/admin/orders/${orderNumber}`),
  updateOrderStatus: (orderNumber, data) => api.put(`/admin/orders/${orderNumber}/status`, data),
  refundOrder: (orderNumber) => api.put(`/admin/orders/${orderNumber}/refund`),
  // Users
  listUsers: (params) => api.get('/admin/users', { params }),
  updateUser: (id, data) => api.put(`/admin/users/${id}`, data),
  // Analytics
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
}
