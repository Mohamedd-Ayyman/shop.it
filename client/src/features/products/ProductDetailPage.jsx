import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductThunk } from '../../store/slices/productSlice'
import { addToCartThunk } from '../../store/slices/cartSlice'
import { addToWishlistThunk, removeFromWishlistThunk } from '../../store/slices/wishlistSlice'
import { formatPrice, formatDate } from '../../lib/utils'
import { reviewService } from '../../services'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const { currentProduct: product, relatedProducts, loading } = useSelector((s) => s.products)
  const { isAuthenticated } = useSelector((s) => s.auth)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (slug) dispatch(fetchProductThunk(slug))
    window.scrollTo(0, 0)
  }, [dispatch, slug])

  useEffect(() => {
    if (product) reviewService.listByProduct(product.slug).then(r => setReviews(r.data.reviews)).catch(() => {})
  }, [product])

  const handleAddToCart = () => {
    if (!isAuthenticated) return alert('Please login to add items')
    dispatch(addToCartThunk({ productId: product._id, quantity, size: selectedSize, color: selectedColor }))
  }

  if (loading || !product) return <div className="text-center py-12 text-text-muted">Loading...</div>

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-100 rounded-card overflow-hidden">
            {product.images?.[0]?.url ? <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-text-muted">No Image</div>}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-h2">{product.name}</h1>
          <p className="text-2xl font-bold text-accent">
            {product.salePrice ? <><span className="line-through text-text-muted text-lg mr-2">{formatPrice(product.price)}</span>{formatPrice(product.salePrice)}</> : formatPrice(product.price)}
          </p>
          <p className="text-text-secondary">{product.description}</p>

          {product.sizes?.length > 0 && (
            <div><h3 className="font-semibold mb-2 text-sm">Size</h3>
              <div className="flex gap-2">{product.sizes.map(s => <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-2 border rounded-button text-sm ${selectedSize === s ? 'border-accent bg-accent text-white' : 'border-border hover:border-accent'}`}>{s}</button>)}</div>
            </div>
          )}

          {product.colors?.length > 0 && (
            <div><h3 className="font-semibold mb-2 text-sm">Color</h3>
              <div className="flex gap-2">{product.colors.map(c => <button key={c.name} onClick={() => setSelectedColor(c.name)} title={c.name} className={`w-8 h-8 rounded-full border-2 ${selectedColor === c.name ? 'border-accent' : 'border-border'}`} style={{ backgroundColor: c.hex }} />)}</div>
            </div>
          )}

          <div><h3 className="font-semibold mb-2 text-sm">Quantity</h3>
            <div className="flex items-center gap-2"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-border rounded">-</button><span className="w-8 text-center">{quantity}</span><button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-8 h-8 border border-border rounded">+</button></div>
          </div>

          <button onClick={handleAddToCart} disabled={product.stock === 0} className="w-full bg-accent hover:bg-accent-hover text-white py-3 rounded-button font-semibold transition disabled:opacity-50">
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          {product.stock > 0 && product.stock <= product.lowStockThreshold && <p className="text-warning text-sm">Only {product.stock} left!</p>}

          <div className="text-sm text-text-secondary"><span className="font-semibold">Category:</span> {product.category?.name || 'N/A'}</div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-12">
        <h2 className="text-h3 mb-4">Reviews ({reviews.length})</h2>
        {reviews.length === 0 ? <p className="text-text-muted">No reviews yet.</p> : reviews.map(r => (
          <div key={r._id} className="border-b border-border py-4">
            <div className="flex items-center gap-2 mb-1"><span className="font-semibold text-sm">{r.user?.name || 'Anonymous'}</span><span className="text-yellow-500 text-sm">{'★'.repeat(r.rating)}</span><span className="text-text-muted text-xs">{formatDate(r.createdAt)}</span></div>
            {r.title && <p className="font-semibold text-sm">{r.title}</p>}
            {r.comment && <p className="text-sm text-text-secondary">{r.comment}</p>}
          </div>
        ))}
      </section>

      {/* Related */}
      {relatedProducts?.length > 0 && (
        <section className="mt-12">
          <h2 className="text-h3 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <Link key={p._id} to={`/shop/products/${p.slug}`} className="bg-surface rounded-card border border-border p-3 hover:shadow-md transition">
                <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center text-xs text-text-muted">{p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" loading="lazy" /> : 'No Image'}</div>
                <p className="font-semibold text-sm truncate">{p.name}</p>
                <p className="text-accent text-sm font-bold">{formatPrice(p.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
