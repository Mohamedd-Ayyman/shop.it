import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { authService } from '../../services'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [done, setDone] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await authService.resetPassword({ token: searchParams.get('token'), password })
    setDone(true)
  }

  if (done) return (
    <div className="text-center">
      <h1 className="text-h2 mb-4">Password Reset</h1>
      <p className="mb-4 text-text-secondary">Your password has been updated.</p>
      <button onClick={() => navigate('/auth/login')} className="text-accent hover:underline">Login</button>
    </div>
  )

  return (
    <div>
      <h1 className="text-h2 mb-6 text-center">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="password" placeholder="New password (min 8 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-button transition font-semibold">Reset Password</button>
      </form>
      <Link to="/auth/login" className="block mt-4 text-sm text-accent hover:underline text-center">Back to Login</Link>
    </div>
  )
}
