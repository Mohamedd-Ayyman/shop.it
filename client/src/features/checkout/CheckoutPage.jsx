import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { createOrderThunk } from '../../store/slices/orderSlice'
import { clearCart } from '../../store/slices/cartSlice'

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [address, setAddress] = useState({ street: '', city: '', state: '', zipCode: '', country: 'US' })
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' })

  const handlePlaceOrder = async () => {
    const result = await dispatch(createOrderThunk({ shippingAddress: address, shippingMethod, paymentDetails: { method: 'card' } }))
    if (result.meta.requestStatus === 'fulfilled') {
      dispatch(clearCart())
      navigate(`/shop/checkout/success?order=${result.payload.order.orderNumber}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-h2 mb-6">Checkout</h1>
      <div className="flex gap-2 mb-6">
        {['Address', 'Shipping', 'Payment', 'Confirm'].map((label, i) => (
          <div key={label} className={`flex-1 text-center py-2 text-sm rounded ${step >= i + 1 ? 'bg-accent text-white' : 'bg-border text-text-muted'}`}>{label}</div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <h2 className="text-h3">Shipping Address</h2>
          <input placeholder="Street" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full px-4 py-3 border border-border rounded-input" />
          <input placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="w-full px-4 py-3 border border-border rounded-input" />
          <div className="flex gap-3"><input placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="flex-1 px-4 py-3 border border-border rounded-input" /><input placeholder="ZIP Code" value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} className="flex-1 px-4 py-3 border border-border rounded-input" /></div>
          <button onClick={() => setStep(2)} className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold">Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <h2 className="text-h3">Shipping Method</h2>
          {[['standard', 'Standard (5-7 days)', '$5.00'], ['express', 'Express (2-3 days)', '$15.00'], ['overnight', 'Overnight', '$25.00']].map(([value, label, cost]) => (
            <label key={value} className={`flex items-center gap-3 p-4 border rounded-card cursor-pointer ${shippingMethod === value ? 'border-accent bg-accent-light' : 'border-border'}`}>
              <input type="radio" name="shipping" value={value} checked={shippingMethod === value} onChange={e => setShippingMethod(e.target.value)} />
              <div><p className="font-semibold text-sm">{label}</p><p className="text-text-muted text-xs">{cost}</p></div>
            </label>
          ))}
          <div className="flex gap-3"><button onClick={() => setStep(1)} className="px-6 py-3 border border-border rounded-button">Back</button><button onClick={() => setStep(3)} className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold">Next</button></div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <h2 className="text-h3">Payment</h2>
          <p className="text-sm text-text-muted">Simulated payment — no real charges</p>
          <input placeholder="Card number (4242 4242 4242 4242)" value={card.number} onChange={e => setCard({...card, number: e.target.value})} className="w-full px-4 py-3 border border-border rounded-input" />
          <div className="flex gap-3"><input placeholder="MM/YY" value={card.expiry} onChange={e => setCard({...card, expiry: e.target.value})} className="flex-1 px-4 py-3 border border-border rounded-input" /><input placeholder="CVV" value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} className="flex-1 px-4 py-3 border border-border rounded-input" /></div>
          <div className="flex gap-3"><button onClick={() => setStep(2)} className="px-6 py-3 border border-border rounded-button">Back</button><button onClick={() => setStep(4)} className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold">Review Order</button></div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <h2 className="text-h3">Confirm & Place Order</h2>
          <div className="bg-surface border border-border rounded-card p-4 space-y-1 text-sm"><p><strong>Ship to:</strong> {address.street}, {address.city}, {address.state} {address.zipCode}</p><p><strong>Method:</strong> {shippingMethod}</p></div>
          <div className="flex gap-3"><button onClick={() => setStep(3)} className="px-6 py-3 border border-border rounded-button">Back</button><button onClick={handlePlaceOrder} className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold">Place Order</button></div>
        </div>
      )}
    </div>
  )
}
