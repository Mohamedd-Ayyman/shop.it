import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchWishlistThunk, removeFromWishlistThunk } from '../../store/slices/wishlistSlice'

export default function WishlistPage() {
  const dispatch = useDispatch()
  const { items } = useSelector((s) => s.wishlist)

  useEffect(() => { dispatch(fetchWishlistThunk()) }, [dispatch])

  if (items.length === 0) return (
    <div className="text-center py-12"><p className="text-h3 mb-4">Your wishlist is empty</p><Link to="/shop/products" className="text-accent hover:underline">Browse Products</Link></div>
  )

  return (
    <div><h1 className="text-h2 mb-6">Wishlist</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(p => (
          <div key={p._id} className="bg-surface rounded-card border border-border p-3">
            <Link to={`/shop/products/${p.slug}`}><div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center text-xs text-text-muted">{p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" /> : 'No Image'}</div></Link>
            <p className="font-semibold text-sm truncate">{p.name}</p>
            <p className="text-accent text-sm font-bold">${p.price}</p>
            <button onClick={() => dispatch(removeFromWishlistThunk(p._id))} className="text-danger text-xs mt-1 hover:underline">Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
