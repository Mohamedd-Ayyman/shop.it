import { useSelector } from 'react-redux'

export function useAuth() {
  const { user, isAuthenticated } = useSelector((s) => s.auth)
  return { user, isAuthenticated, isAdmin: user?.role === 'admin' }
}
