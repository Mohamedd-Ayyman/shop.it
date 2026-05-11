import { cn } from '../../lib/utils'

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)} className="px-3 py-1.5 border border-border rounded-button text-sm disabled:opacity-40 hover:border-accent transition">Prev</button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} onClick={() => onPageChange(p)}
          className={cn('px-3 py-1.5 rounded-button text-sm transition', p === page ? 'bg-accent text-white' : 'border border-border hover:border-accent')}>{p}</button>
      ))}
      <button disabled={page >= pages} onClick={() => onPageChange(page + 1)} className="px-3 py-1.5 border border-border rounded-button text-sm disabled:opacity-40 hover:border-accent transition">Next</button>
    </div>
  )
}
