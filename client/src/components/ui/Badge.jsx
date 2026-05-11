import { cn } from '../../lib/utils'
import { statusColor } from '../../lib/utils'

export default function Badge({ children, variant, className }) {
  const color = variant ? statusColor(variant) : 'bg-gray-100 text-gray-800'
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', color, className)}>
      {children}
    </span>
  )
}
