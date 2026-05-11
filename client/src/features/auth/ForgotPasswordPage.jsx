import { useState } from 'react'
import { authService } from '../../services'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await authService.forgotPassword(email)
    setSent(true)
  }

  if (sent) return (
    <div className="text-center">
      <h1 className="text-h2 mb-4">Check Your Email</h1>
      <p className="text-text-secondary mb-4">If an account exists, a reset link has been sent.</p>
      <Link to="/auth/login" className="text-accent hover:underline">Back to Login</Link>
    </div>
  )

  return (
    <div>
      <h1 className="text-h2 mb-6 text-center">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input focus:outline-none focus:ring-2 focus:ring-accent" />
        <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-button transition font-semibold">Send Reset Link</button>
      </form>
      <p className="mt-4 text-sm text-center"><Link to="/auth/login" className="text-accent hover:underline">Back to Login</Link></p>
    </div>
  )
}
