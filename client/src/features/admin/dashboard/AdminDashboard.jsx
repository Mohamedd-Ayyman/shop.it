import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../../services'
import { formatPrice, formatDate } from '../../../lib/utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => { adminService.getAnalytics({ period: 30 }).then(r => setStats(r.data)).catch(() => {}) }, [])

  if (!stats) return <p className="text-text-muted">Loading...</p>

  return (
    <div>
      <h1 className="text-h2 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[['Total Revenue', `$${stats.totalRevenue?.toLocaleString() || '0'}`, '🤑'], ['Orders Today', stats.totalOrders || 0, '📦'], ['Active Products', stats.totalProducts || 0, '🏷️'], ['New Users', stats.totalUsers || 0, '👤']].map(([label, value, icon]) => (
          <div key={label} className="bg-surface border border-border rounded-card p-4"><p className="text-2xl font-bold">{value}</p><p className="text-sm text-text-muted">{label}</p></div>
        ))}
      </div>

      <h2 className="text-h3 mb-4">Recent Orders</h2>
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        {stats.recentOrders?.length ? <table className="w-full text-sm"><thead><tr className="border-b border-border bg-gray-50"><th className="text-left p-3">Order</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr></thead><tbody>{stats.recentOrders.map(o => <tr key={o._id} className="border-b border-border"><td className="p-3"><Link to={`/admin/orders/${o.orderNumber}`} className="text-accent hover:underline">{o.orderNumber}</Link></td><td className="p-3">{formatPrice(o.total)}</td><td className="p-3"><span className="capitalize">{o.status}</span></td><td className="p-3 text-text-muted">{formatDate(o.createdAt)}</td></tr>)}</tbody></table> : <p className="p-4 text-text-muted">No orders yet</p>}
      </div>
    </div>
  )
}
