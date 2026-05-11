import { cn } from '../../lib/utils'

export default function Skeleton({ className, variant = 'text' }) {
  const shapes = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    image: 'aspect-square w-full',
    card: 'h-32 w-full rounded-card',
  }
  return <div className={cn('animate-pulse bg-gray-200 rounded', shapes[variant], className)} />
}

export function SkeletonCard() {
  return (
    <div className="space-y-3">
      <Skeleton variant="image" />
      <Skeleton variant="title" />
      <Skeleton variant="text" className="w-1/3" />
    </div>
  )
}
