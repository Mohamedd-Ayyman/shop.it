import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminService } from '../../../services'
import { formatPrice, formatDate } from '../../../lib/utils'

export default function AdminOrderDetail() {
  const { orderNumber } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (orderNumber) adminService.getOrder(orderNumber).then(r => { setOrder(r.data.order); setStatus(r.data.order.status) }).catch(() => {})
  }, [orderNumber])

  const handleUpdateStatus = async () => {
    await adminService.updateOrderStatus(orderNumber, { status })
    navigate('/admin/orders')
  }

  if (!order) return <p className="text-text-muted">Loading...</p>

  return (
    <div className="max-w-3xl">
      <h1 className="text-h2 mb-6">Order #{order.orderNumber}</h1>
      <div className="bg-surface border border-border rounded-card p-6 space-y-4">
        <div className="flex items-center gap-4"><span className="font-semibold">Status:</span>
          <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2 border border-border rounded-input text-sm">
            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button onClick={handleUpdateStatus} className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-button text-sm">Update</button>
        </div>

        <div className="border-t border-border pt-4">
          {order.items?.map((item, i) => <div key={i} className="flex justify-between text-sm py-2"><span>{item.name} x{item.quantity}</span><span>{formatPrice(item.price * item.quantity)}</span></div>)}
          <div className="border-t border-border mt-3 pt-3 space-y-1 text-sm"><div className="flex justify-between"><span>Total</span><span className="font-bold">{formatPrice(order.total)}</span></div></div>
        </div>

        {order.shippingAddress && <div className="border-t border-border pt-4 text-sm"><h3 className="font-semibold mb-2">Shipping</h3><p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p></div>}
      </div>
    </div>
  )
}
