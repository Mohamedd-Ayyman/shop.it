import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../../services'
import { formatPrice, formatDate, statusColor } from '../../../lib/utils'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => { adminService.listOrders({ page, limit: 20 }).then(r => setOrders(r.data.orders)).catch(() => {}) }, [page])

  return (
    <div>
      <h1 className="text-h2 mb-6">Orders</h1>
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm"><thead><tr className="border-b border-border bg-gray-50"><th className="text-left p-3">Order #</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="text-left p-3">Date</th></tr></thead>
          <tbody>{orders.map(o => <tr key={o._id} className="border-b border-border"><td className="p-3"><Link to={`/admin/orders/${o.orderNumber}`} className="text-accent hover:underline">{o.orderNumber}</Link></td><td className="p-3">{formatPrice(o.total)}</td><td className="p-3"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(o.status)}`}>{o.status}</span></td><td className="p-3 text-text-muted">{formatDate(o.createdAt)}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
