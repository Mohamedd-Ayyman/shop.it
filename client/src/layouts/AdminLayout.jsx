import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/products', label: 'Products', icon: '📦' },
  { path: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { path: '/admin/orders', label: 'Orders', icon: '📋' },
  { path: '/admin/users', label: 'Users', icon: '👥' },
  { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
]

export default function AdminLayout() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((s) => s.auth)

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-60 bg-primary text-white flex flex-col shrink-0">
        <div className="p-4 text-xl font-bold border-b border-primary-light">Shop.it Admin</div>
        <nav className="flex-1 p-2 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${location.pathname === item.path ? 'bg-accent text-white' : 'text-text-muted hover:bg-primary-light hover:text-white'}`}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-light text-sm text-text-muted">
          <p>{user?.name}</p>
          <button onClick={() => { dispatch(logout()); navigate('/auth/login') }} className="text-accent hover:underline mt-1">Logout</button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
