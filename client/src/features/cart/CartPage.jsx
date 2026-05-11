import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCartThunk, removeFromCartThunk, updateCartItemThunk } from '../../store/slices/cartSlice'
import { formatPrice } from '../../lib/utils'

export default function CartPage() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector((s) => s.cart)
  const subtotal = items.reduce((sum, i) => sum + (i.price || 0) * i.quantity, 0)

  useEffect(() => { dispatch(fetchCartThunk()) }, [dispatch])

  if (loading) return <p className="text-text-muted text-center py-12">Loading...</p>

  if (items.length === 0) return (
    <div className="text-center py-12">
      <p className="text-h3 mb-4">Your cart is empty</p>
      <Link to="/shop/products" className="text-accent hover:underline">Continue Shopping</Link>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-h2 mb-6">Cart</h1>
      {items.map((item) => (
        <div key={item._id} className="flex items-center gap-4 border-b border-border py-4">
          <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-text-muted shrink-0">
            {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : 'No Img'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{item.name || item.product?.name || 'Product'}</p>
            <p className="text-sm text-text-secondary">{item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => dispatch(updateCartItemThunk({ itemId: item._id, quantity: Math.max(1, item.quantity - 1) }))} className="w-7 h-7 border border-border rounded text-sm">-</button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button onClick={() => dispatch(updateCartItemThunk({ itemId: item._id, quantity: item.quantity + 1 }))} className="w-7 h-7 border border-border rounded text-sm">+</button>
          </div>
          <p className="font-bold w-20 text-right">{formatPrice((item.price || 0) * item.quantity)}</p>
          <button onClick={() => dispatch(removeFromCartThunk(item._id))} className="text-danger text-sm hover:underline">Remove</button>
        </div>
      ))}
      <div className="text-right mt-6">
        <p className="text-lg font-bold">Total: {formatPrice(subtotal)}</p>
        <Link to="/shop/checkout" className="inline-block mt-4 bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold transition">Proceed to Checkout</Link>
      </div>
    </div>
  )
}
