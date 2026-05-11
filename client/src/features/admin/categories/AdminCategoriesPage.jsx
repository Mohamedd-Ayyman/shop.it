import { useState, useEffect } from 'react'
import { adminService } from '../../../services'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([])
  const [newName, setNewName] = useState('')

  const fetch = () => adminService.listCategories().then(r => setCategories(r.data.categories)).catch(() => {})
  useEffect(() => { fetch() }, [])

  const handleAdd = async () => {
    if (!newName.trim()) return
    const slug = newName.toLowerCase().replace(/\s+/g, '-')
    await adminService.createCategory({ name: newName, slug })
    setNewName('')
    fetch()
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return
    try { await adminService.deleteCategory(id) } catch { alert('Cannot delete: category has products') }
    fetch()
  }

  return (
    <div>
      <h1 className="text-h2 mb-6">Categories</h1>
      <div className="bg-surface border border-border rounded-card overflow-hidden mb-6">
        <table className="w-full text-sm"><thead><tr className="border-b border-border bg-gray-50"><th className="text-left p-3">Name</th><th className="text-left p-3">Slug</th><th className="text-left p-3">Actions</th></tr></thead>
          <tbody>{categories.map(c => <tr key={c._id} className="border-b border-border"><td className="p-3">{c.name}</td><td className="p-3 text-text-muted">{c.slug}</td><td className="p-3"><button onClick={() => handleDelete(c._id)} className="text-danger hover:underline text-xs">Delete</button></td></tr>)}</tbody>
        </table>
      </div>
      <div className="flex gap-3"><input placeholder="New category name" value={newName} onChange={e => setNewName(e.target.value)} className="flex-1 px-4 py-3 border border-border rounded-input" /><button onClick={handleAdd} className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-button">Add</button></div>
    </div>
  )
}
