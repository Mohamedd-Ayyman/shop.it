import { cn } from '../../lib/utils'

const variants = {
  primary: 'bg-accent hover:bg-accent-hover text-white',
  secondary: 'bg-white border border-border hover:border-accent text-text-primary',
  ghost: 'bg-transparent hover:bg-gray-100 text-text-primary',
  danger: 'bg-danger hover:bg-red-600 text-white',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export default function Button({ variant = 'primary', size = 'md', className, loading, disabled, children, ...props }) {
  return (
    <button className={cn('inline-flex items-center justify-center font-semibold rounded-button transition disabled:opacity-50 disabled:cursor-not-allowed', variants[variant], sizes[size], className)}
      disabled={disabled || loading} {...props}>
      {loading && <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
      {children}
    </button>
  )
}
