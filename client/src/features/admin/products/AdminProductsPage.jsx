import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { adminService } from '../../../services'
import { formatPrice } from '../../../lib/utils'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const fetchProducts = () => adminService.listProducts({ page, limit: 20 }).then(r => { setProducts(r.data.products); setTotal(r.data.total) }).catch(() => {})
  useEffect(() => { fetchProducts() }, [page])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    await adminService.deleteProduct(id)
    fetchProducts()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-h2">Products</h1>
        <Link to="/admin/products/new" className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-button text-sm">+ Add Product</Link>
      </div>
      <div className="bg-surface border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-gray-50"><th className="text-left p-3">Name</th><th className="text-left p-3">Price</th><th className="text-left p-3">Stock</th><th className="text-left p-3">Actions</th></tr></thead>
          <tbody>{products.map(p => <tr key={p._id} className="border-b border-border"><td className="p-3">{p.name}</td><td className="p-3">{formatPrice(p.price)}</td><td className="p-3">{p.stock}</td><td className="p-3 flex gap-2"><Link to={`/admin/products/${p._id}/edit`} className="text-accent hover:underline text-xs">Edit</Link><button onClick={() => handleDelete(p._id)} className="text-danger hover:underline text-xs">Delete</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  )
}
