import { useSearchParams, Link } from 'react-router-dom'

export default function OrderSuccessPage() {
  const [params] = useSearchParams()
  const order = params.get('order')

  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-h2 mb-2">Order Confirmed!</h1>
      <p className="text-text-secondary mb-2">Thank you for your purchase.</p>
      {order && <p className="text-sm text-text-muted mb-6">Order #{order}</p>}
      <div className="flex justify-center gap-4">
        <Link to={`/shop/orders/${order}`} className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-button transition">View Order</Link>
        <Link to="/shop/products" className="border border-border px-6 py-3 rounded-button hover:border-accent transition">Continue Shopping</Link>
      </div>
    </div>
  )
}
