import { useState, useEffect } from 'react'
import { adminService } from '../../../services'
import { formatPrice } from '../../../lib/utils'

export default function AdminAnalytics() {
  const [data, setData] = useState(null)

  useEffect(() => { adminService.getAnalytics({ period: 30 }).then(r => setData(r.data)).catch(() => {}) }, [])

  if (!data) return <p className="text-text-muted">Loading...</p>

  return (
    <div>
      <h1 className="text-h2 mb-6">Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-card p-4"><p className="text-2xl font-bold">{formatPrice(data.totalRevenue || 0)}</p><p className="text-sm text-text-muted">Revenue</p></div>
        <div className="bg-surface border border-border rounded-card p-4"><p className="text-2xl font-bold">{data.totalOrders || 0}</p><p className="text-sm text-text-muted">Orders</p></div>
        <div className="bg-surface border border-border rounded-card p-4"><p className="text-2xl font-bold">{data.totalProducts || 0}</p><p className="text-sm text-text-muted">Products</p></div>
        <div className="bg-surface border border-border rounded-card p-4"><p className="text-2xl font-bold">{data.totalUsers || 0}</p><p className="text-sm text-text-muted">Users</p></div>
      </div>

      {data.topProducts?.length > 0 && (
        <div className="bg-surface border border-border rounded-card p-4 mb-6">
          <h2 className="font-semibold mb-3">Top Products</h2>
          <table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left p-2">Product</th><th className="text-left p-2">Qty Sold</th><th className="text-left p-2">Revenue</th></tr></thead>
            <tbody>{data.topProducts.map((p, i) => <tr key={i} className="border-b border-border"><td className="p-2">{p._id}</td><td className="p-2">{p.quantity}</td><td className="p-2">{formatPrice(p.revenue)}</td></tr>)}</tbody>
          </table>
        </div>
      )}

      {data.orderStatusBreakdown?.length > 0 && (
        <div className="bg-surface border border-border rounded-card p-4">
          <h2 className="font-semibold mb-3">Orders by Status</h2>
          {data.orderStatusBreakdown.map(s => <div key={s._id} className="flex justify-between py-1 text-sm"><span className="capitalize">{s._id}</span><span>{s.count}</span></div>)}
        </div>
      )}
    </div>
  )
}
