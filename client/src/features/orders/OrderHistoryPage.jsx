import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchOrdersThunk } from '../../store/slices/orderSlice'
import { formatDate, formatPrice, statusColor } from '../../lib/utils'

export default function OrderHistoryPage() {
  const dispatch = useDispatch()
  const { orders, loading } = useSelector((s) => s.orders)

  useEffect(() => { dispatch(fetchOrdersThunk({})) }, [dispatch])

  if (loading) return <p className="text-text-muted text-center py-12">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-h2 mb-6">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-12"><p className="text-text-muted mb-4">No orders yet</p><Link to="/shop/products" className="text-accent hover:underline">Start Shopping</Link></div>
      ) : orders.map(o => (
        <Link key={o._id} to={`/shop/orders/${o.orderNumber}`} className="flex items-center justify-between border-b border-border py-4 hover:bg-gray-50 px-4 rounded transition">
          <div><p className="font-semibold text-sm">{o.orderNumber}</p><p className="text-xs text-text-muted">{formatDate(o.createdAt)}</p></div>
          <div className="text-right"><span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${statusColor(o.status)}`}>{o.status}</span><p className="text-sm font-bold mt-1">{formatPrice(o.total)}</p></div>
        </Link>
      ))}
    </div>
  )
}
