import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrderThunk } from '../../store/slices/orderSlice'
import { formatPrice, formatDate, statusColor } from '../../lib/utils'

export default function OrderDetailPage() {
  const { orderNumber } = useParams()
  const dispatch = useDispatch()
  const { currentOrder: order, loading } = useSelector((s) => s.orders)

  useEffect(() => { if (orderNumber) dispatch(fetchOrderThunk(orderNumber)) }, [dispatch, orderNumber])

  if (loading || !order) return <p className="text-center py-12 text-text-muted">Loading...</p>

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/shop/orders" className="text-accent hover:underline text-sm">&larr; Back to Orders</Link>
      <h1 className="text-h2 mt-2 mb-2">Order #{order.orderNumber}</h1>
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor(order.status)}`}>{order.status}</span>

      {/* Status timeline */}
      <div className="mt-6 space-y-2">
        {order.statusHistory?.map((h, i) => (
          <div key={i} className="flex items-center gap-3 text-sm"><div className="w-2 h-2 rounded-full bg-accent" /><span className="capitalize">{h.status}</span><span className="text-text-muted text-xs">{formatDate(h.timestamp)}</span>{h.note && <span className="text-text-muted">— {h.note}</span>}</div>
        ))}
      </div>

      <div className="mt-6 bg-surface border border-border rounded-card p-4">
        <h2 className="font-semibold mb-3">Items</h2>
        {order.items?.map((item, i) => (
          <div key={i} className="flex justify-between py-2 border-b border-border last:border-0 text-sm"><span>{item.name} x{item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>
        ))}
        <div className="border-t border-border mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(order.shippingCost)}</span></div>
          {order.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(order.discount)}</span></div>}
          <div className="flex justify-between font-bold text-base"><span>Total</span><span>{formatPrice(order.total)}</span></div>
        </div>
      </div>
    </div>
  )
}
