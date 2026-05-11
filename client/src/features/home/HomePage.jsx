import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchFeaturedThunk } from '../../store/slices/productSlice'

export default function HomePage() {
  const dispatch = useDispatch()
  const { items: products } = useSelector((s) => s.products)

  useEffect(() => { dispatch(fetchFeaturedThunk()) }, [dispatch])

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-light text-white rounded-card p-12 mb-12">
        <h1 className="text-display mb-4">Discover Your Style</h1>
        <p className="text-lg text-text-muted mb-6 max-w-lg">Premium fashion and lifestyle products curated for you.</p>
        <Link to="/shop/products" className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button transition font-semibold">Shop Now</Link>
      </section>

      {/* Featured */}
      <section>
        <h2 className="text-h2 mb-6">Featured Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <Link key={p._id} to={`/shop/products/${p.slug}`} className="bg-surface rounded-card border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="aspect-square bg-gray-100 flex items-center justify-center text-text-muted text-sm">
                {p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" loading="lazy" /> : 'No Image'}
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{p.name}</h3>
                <p className="text-accent font-bold mt-1">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
