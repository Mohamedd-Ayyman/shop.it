import { cn } from '../../lib/utils'

export default function Card({ className, children, hover = false, ...props }) {
  return (
    <div className={cn('bg-surface border border-border rounded-card', hover && 'hover:shadow-md hover:-translate-y-0.5 transition-all', className)} {...props}>
      {children}
    </div>
  )
}
