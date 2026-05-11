import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useDebounce } from '../hooks/useDebounce'
import { logout } from '../store/slices/authSlice'
import { ROUTES } from '../lib/constants'

export default function Header() {
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const debouncedSearch = useDebounce(search, 300)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((s) => s.auth)
  const cartCount = useSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0))
  const wishlistCount = useSelector((s) => s.wishlist.items.length)
  const unreadCount = useSelector((s) => s.notifications.unreadCount)

  const handleSearch = (e) => { e.preventDefault(); if (search.trim()) navigate(`${ROUTES.PRODUCTS}?q=${search}`); }

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="text-xl font-bold text-primary">Shop.it</Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-accent text-sm" />
        </form>

        <nav className="flex items-center gap-4 text-sm">
          <Link to={ROUTES.PRODUCTS} className="hover:text-accent transition">Shop</Link>
          <Link to={ROUTES.CART} className="relative hover:text-accent transition">
            Cart {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
          </Link>
          <Link to={ROUTES.WISHLIST} className="relative hover:text-accent transition">
            Wishlist {wishlistCount > 0 && <span className="absolute -top-2 -right-3 bg-danger text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlistCount}</span>}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to={ROUTES.NOTIFICATIONS} className="relative hover:text-accent transition">
                🔔 {unreadCount > 0 && <span className="absolute -top-2 -right-3 bg-warning text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unreadCount}</span>}
              </Link>
              <Link to={ROUTES.PROFILE} className="hover:text-accent transition">{user?.name}</Link>
              {user?.role === 'admin' && <Link to="/admin" className="text-accent hover:underline">Admin</Link>}
              <button onClick={() => { dispatch(logout()); navigate('/') }} className="text-text-muted hover:text-danger transition">Logout</button>
            </div>
          ) : (
            <Link to={ROUTES.LOGIN} className="bg-accent text-white px-4 py-2 rounded-button hover:bg-accent-hover transition text-sm">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
