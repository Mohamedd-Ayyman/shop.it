import { cn } from '../../lib/utils'

export default function Input({ label, error, iconLeft, iconRight, className, ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium text-text-primary">{label}</label>}
      <div className="relative">
        {iconLeft && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">{iconLeft}</span>}
        <input className={cn('w-full px-4 py-3 border rounded-input text-sm transition focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent placeholder:text-text-muted',
          iconLeft && 'pl-10', iconRight && 'pr-10', error ? 'border-danger focus:ring-danger' : 'border-border', className)} {...props} />
        {iconRight && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">{iconRight}</span>}
      </div>
      {error && <p className="text-danger text-xs">{error}</p>}
    </div>
  )
}
