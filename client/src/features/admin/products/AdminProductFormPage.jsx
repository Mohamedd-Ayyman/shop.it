import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminService, categoryService } from '../../../services'

export default function AdminProductFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({ name: '', slug: '', description: '', price: '', salePrice: '', category: '', stock: '', isFeatured: false })

  useEffect(() => {
    categoryService.list().then(r => setCategories(r.data.categories)).catch(() => {})
    if (isEdit) adminService.listProducts({}).then(r => {
      const p = r.data.products.find(x => x._id === id)
      if (p) setForm({ name: p.name, slug: p.slug, description: p.description, price: p.price, salePrice: p.salePrice || '', category: p.category?._id || p.category, stock: p.stock, isFeatured: p.isFeatured })
    }).catch(() => {})
  }, [id, isEdit])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEdit) await adminService.updateProduct(id, form)
    else await adminService.createProduct(form)
    navigate('/admin/products')
  }

  const onChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-h2 mb-6">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-surface border border-border rounded-card p-6">
        <input placeholder="Name" value={form.name} onChange={e => onChange('name', e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input" />
        <input placeholder="Slug" value={form.slug} onChange={e => onChange('slug', e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input" />
        <textarea placeholder="Description" value={form.description} onChange={e => onChange('description', e.target.value)} required rows={3} className="w-full px-4 py-3 border border-border rounded-input" />
        <div className="flex gap-3"><input type="number" placeholder="Price" value={form.price} onChange={e => onChange('price', e.target.value)} required step="0.01" className="flex-1 px-4 py-3 border border-border rounded-input" /><input type="number" placeholder="Sale Price" value={form.salePrice} onChange={e => onChange('salePrice', e.target.value)} step="0.01" className="flex-1 px-4 py-3 border border-border rounded-input" /></div>
        <select value={form.category} onChange={e => onChange('category', e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input"><option value="">Select Category</option>{categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}</select>
        <input type="number" placeholder="Stock" value={form.stock} onChange={e => onChange('stock', e.target.value)} required className="w-full px-4 py-3 border border-border rounded-input" />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isFeatured} onChange={e => onChange('isFeatured', e.target.checked)} /> Featured</label>
        <button type="submit" className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-button font-semibold">{isEdit ? 'Update' : 'Create'} Product</button>
      </form>
    </div>
  )
}
