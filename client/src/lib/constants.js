// Route constants
export const ROUTES = {
  HOME: '/shop',
  PRODUCTS: '/shop/products',
  PRODUCT_DETAIL: (slug) => `/shop/products/${slug}`,
  CART: '/shop/cart',
  CHECKOUT: '/shop/checkout',
  ORDER_SUCCESS: '/shop/checkout/success',
  WISHLIST: '/shop/wishlist',
  ORDERS: '/shop/orders',
  ORDER_DETAIL: (num) => `/shop/orders/${num}`,
  PROFILE: '/shop/profile',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  ADMIN: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_PRODUCT_NEW: '/admin/products/new',
  ADMIN_PRODUCT_EDIT: (id) => `/admin/products/${id}/edit`,
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_ORDER_DETAIL: (num) => `/admin/orders/${num}`,
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Shop.it'
