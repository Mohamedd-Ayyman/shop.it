import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/authSlice'

export default function ProfilePage() {
  const { user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to deactivate your account?')) {
      dispatch(logout())
      navigate('/')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-h2 mb-6">My Profile</h1>
      <div className="bg-surface border border-border rounded-card p-6 space-y-4">
        <div><label className="text-xs text-text-muted uppercase">Name</label><p className="font-semibold">{user?.name}</p></div>
        <div><label className="text-xs text-text-muted uppercase">Email</label><p className="font-semibold">{user?.email}</p></div>
        <div><label className="text-xs text-text-muted uppercase">Role</label><p className="font-semibold capitalize">{user?.role}</p></div>
        <button onClick={handleDelete} className="text-danger text-sm hover:underline">Deactivate Account</button>
      </div>
    </div>
  )
}
