import { useState, useEffect } from 'react'
import { adminService } from '../../../services'
import { formatDate } from '../../../lib/utils'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => { adminService.listUsers({}).then(r => setUsers(r.data.users)).catch(() => {}) }, [])

  const toggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'customer' : 'admin'
    await adminService.updateUser(id, { role: newRole })
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u))
  }

  return (
    <div>
      <h1 className="text-h2 mb-6">Users</h1>
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm"><thead><tr className="border-b border-border bg-gray-50"><th className="text-left p-3">Name</th><th className="text-left p-3">Email</th><th className="text-left p-3">Role</th><th className="text-left p-3">Actions</th></tr></thead>
          <tbody>{users.map(u => <tr key={u._id} className="border-b border-border"><td className="p-3">{u.name}</td><td className="p-3 text-text-muted">{u.email}</td><td className="p-3 capitalize">{u.role}</td><td className="p-3"><button onClick={() => toggleRole(u._id, u.role)} className="text-accent hover:underline text-xs">Toggle Role</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
