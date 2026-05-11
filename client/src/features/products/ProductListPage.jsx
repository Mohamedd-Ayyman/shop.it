import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsThunk, setPage } from '../../store/slices/productSlice'
import { formatPrice } from '../../lib/utils'

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const { items, total, page, pages, loading } = useSelector((s) => s.products)

  const q = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const sort = searchParams.get('sort') || 'featured'
  const currentPage = Number(searchParams.get('page')) || 1

  useEffect(() => {
    dispatch(fetchProductsThunk({ q, category, sort, page: currentPage, limit: 12 }))
  }, [dispatch, q, category, sort, currentPage])

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value); else next.delete(key)
    next.set('page', '1')
    setSearchParams(next)
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <aside className="w-full md:w-56 shrink-0 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-sm">Category</h3>
            <select value={category} onChange={(e) => updateParam('category', e.target.value)} className="w-full px-3 py-2 border border-border rounded-input text-sm">
              <option value="">All</option>
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="dresses">Dresses</option>
              <option value="accessories">Accessories</option>
              <option value="shoes">Shoes</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-sm">Sort</h3>
            <select value={sort} onChange={(e) => updateParam('sort', e.target.value)} className="w-full px-3 py-2 border border-border rounded-input text-sm">
              <option value="featured">Featured</option>
              <option value="price_asc">Price Low→High</option>
              <option value="price_desc">Price High→Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {q && <p className="text-sm text-text-secondary mb-4">{total} results for "{q}"</p>}
          {loading ? <p className="text-text-muted">Loading...</p> : items.length === 0 ? (
            <p className="text-text-muted text-center py-12">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((p) => (
                <Link key={p._id} to={`/shop/products/${p.slug}`} className="bg-surface rounded-card border border-border overflow-hidden hover:shadow-md transition">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center text-xs text-text-muted">
                    {p.images?.[0]?.url ? <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" loading="lazy" /> : 'No Image'}
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">{p.name}</h3>
                    <p className="text-accent font-bold text-sm mt-1">
                      {p.salePrice ? <><span className="line-through text-text-muted mr-1">{formatPrice(p.price)}</span>{formatPrice(p.salePrice)}</> : formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => { dispatch(setPage(p)); const next = new URLSearchParams(searchParams); next.set('page', String(p)); setSearchParams(next) }}
                  className={`px-3 py-1 rounded text-sm ${p === currentPage ? 'bg-accent text-white' : 'bg-border hover:bg-border-hover'}`}>{p}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
