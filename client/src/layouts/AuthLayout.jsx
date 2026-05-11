import { Outlet, Link } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-primary">Shop.it</Link>
        </div>
        <div className="bg-surface rounded-card shadow-sm border border-border p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
