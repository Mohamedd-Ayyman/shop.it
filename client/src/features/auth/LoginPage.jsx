import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { loginThunk } from '../../store/slices/authSlice'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginThunk({ email, password }))
    if (result.meta.requestStatus === 'fulfilled') navigate('/shop')
  }

  return (
    <div>
      <h1 className="text-h2 mb-6 text-center">Login</h1>
      {error && <p className="text-danger text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-button transition font-semibold disabled:opacity-50">
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-sm text-center text-text-secondary">
        <Link to="/auth/forgot-password" className="hover:text-accent">Forgot password?</Link>
        <span className="mx-2">·</span>
        <Link to="/auth/register" className="hover:text-accent">Create account</Link>
      </div>
    </div>
  )
}
