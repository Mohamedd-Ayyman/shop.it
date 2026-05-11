import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminRoute({ children }) {
  const { user, isAuthenticated, loading } = useSelector((s) => s.auth)

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />
  if (user?.role !== 'admin') return <div className="flex items-center justify-center min-h-screen text-danger text-xl">403 — Access Denied</div>
  return children
}
