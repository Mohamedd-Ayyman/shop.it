import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { registerThunk } from '../../store/slices/authSlice'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector((s) => s.auth)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(registerThunk({ name, email, password }))
    if (result.meta.requestStatus === 'fulfilled') navigate('/shop')
  }

  return (
    <div>
      <h1 className="text-h2 mb-6 text-center">Register</h1>
      {error && <p className="text-danger text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <input type="password" placeholder="Password (min 8 chars)" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-button transition font-semibold disabled:opacity-50">
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <p className="mt-4 text-sm text-center text-text-secondary">Have an account? <Link to="/auth/login" className="text-accent hover:underline">Login</Link></p>
    </div>
  )
}
