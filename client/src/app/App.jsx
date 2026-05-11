import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { connectSocket, disconnectSocket } from '../services/socket'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from '../router/ProtectedRoute'
import AdminRoute from '../router/AdminRoute'

// Lazy-loaded pages
const HomePage = lazy(() => import('../features/home/HomePage'))
const ProductListPage = lazy(() => import('../features/products/ProductListPage'))
const ProductDetailPage = lazy(() => import('../features/products/ProductDetailPage'))
const CartPage = lazy(() => import('../features/cart/CartPage'))
const CheckoutPage = lazy(() => import('../features/checkout/CheckoutPage'))
const OrderSuccessPage = lazy(() => import('../features/checkout/OrderSuccessPage'))
const WishlistPage = lazy(() => import('../features/wishlist/WishlistPage'))
const OrderHistoryPage = lazy(() => import('../features/orders/OrderHistoryPage'))
const OrderDetailPage = lazy(() => import('../features/orders/OrderDetailPage'))
const ProfilePage = lazy(() => import('../features/profile/ProfilePage'))
const LoginPage = lazy(() => import('../features/auth/LoginPage'))
const RegisterPage = lazy(() => import('../features/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('../features/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('../features/auth/ResetPasswordPage'))
const AdminDashboard = lazy(() => import('../features/admin/dashboard/AdminDashboard'))
const AdminProductsPage = lazy(() => import('../features/admin/products/AdminProductsPage'))
const AdminProductFormPage = lazy(() => import('../features/admin/products/AdminProductFormPage'))
const AdminCategoriesPage = lazy(() => import('../features/admin/categories/AdminCategoriesPage'))
const AdminOrdersPage = lazy(() => import('../features/admin/orders/AdminOrdersPage'))
const AdminOrderDetail = lazy(() => import('../features/admin/orders/AdminOrderDetail'))
const AdminUsersPage = lazy(() => import('../features/admin/users/AdminUsersPage'))
const AdminAnalytics = lazy(() => import('../features/admin/analytics/AdminAnalytics'))
const NotFoundPage = lazy(() => import('../features/notFound/NotFoundPage'))

function App() {
  const { isAuthenticated } = useSelector((s) => s.auth)

  useEffect(() => {
    if (isAuthenticated) connectSocket()
    else disconnectSocket()
  }, [isAuthenticated])

  const Load = ({ children }) => <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-text-muted">Loading...</div>}>{children}</Suspense>

  return (
    <Routes>
      {/* Customer routes */}
      <Route element={<MainLayout />}>
        <Route path="/shop" element={<Load><HomePage /></Load>} />
        <Route path="/shop/products" element={<Load><ProductListPage /></Load>} />
        <Route path="/shop/products/:slug" element={<Load><ProductDetailPage /></Load>} />
        <Route path="/shop/cart" element={<Load><CartPage /></Load>} />
        <Route path="/shop/checkout" element={<ProtectedRoute><Load><CheckoutPage /></Load></ProtectedRoute>} />
        <Route path="/shop/checkout/success" element={<ProtectedRoute><Load><OrderSuccessPage /></Load></ProtectedRoute>} />
        <Route path="/shop/wishlist" element={<ProtectedRoute><Load><WishlistPage /></Load></ProtectedRoute>} />
        <Route path="/shop/orders" element={<ProtectedRoute><Load><OrderHistoryPage /></Load></ProtectedRoute>} />
        <Route path="/shop/orders/:orderNumber" element={<ProtectedRoute><Load><OrderDetailPage /></Load></ProtectedRoute>} />
        <Route path="/shop/profile" element={<ProtectedRoute><Load><ProfilePage /></Load></ProtectedRoute>} />
      </Route>

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Load><LoginPage /></Load>} />
        <Route path="/auth/register" element={<Load><RegisterPage /></Load>} />
        <Route path="/auth/forgot-password" element={<Load><ForgotPasswordPage /></Load>} />
        <Route path="/auth/reset-password" element={<Load><ResetPasswordPage /></Load>} />
      </Route>

      {/* Admin routes */}
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin" element={<Load><AdminDashboard /></Load>} />
        <Route path="/admin/products" element={<Load><AdminProductsPage /></Load>} />
        <Route path="/admin/products/new" element={<Load><AdminProductFormPage /></Load>} />
        <Route path="/admin/products/:id/edit" element={<Load><AdminProductFormPage /></Load>} />
        <Route path="/admin/categories" element={<Load><AdminCategoriesPage /></Load>} />
        <Route path="/admin/orders" element={<Load><AdminOrdersPage /></Load>} />
        <Route path="/admin/orders/:orderNumber" element={<Load><AdminOrderDetail /></Load>} />
        <Route path="/admin/users" element={<Load><AdminUsersPage /></Load>} />
        <Route path="/admin/analytics" element={<Load><AdminAnalytics /></Load>} />
      </Route>

      {/* Redirect root + 404 */}
      <Route path="/" element={<Load><HomePage /></Load>} />
      <Route path="*" element={<Load><NotFoundPage /></Load>} />
    </Routes>
  )
}

export default App
