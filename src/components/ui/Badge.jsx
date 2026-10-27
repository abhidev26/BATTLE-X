import { clsx } from 'clsx'

/**
 * Badge component for BATTLEZONE X
 * Maps variant names to badge-* CSS classes defined in index.css
 */
const variantMap = {
  red: 'badge-red',
  gold: 'badge-gold',
  gray: 'badge-gray',
  green: 'badge-green',
  cyan: 'badge-cyan',
  purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
}

const sizeMap = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-xs px-2.5 py-1',
}

export default function Badge({
  variant = 'gray',
  size = 'md',
  children,
  className,
  ...rest
}) {
  return (
    <span
      className={clsx(
        variantMap[variant],
        sizeMap[size],
        'inline-flex items-center font-display tracking-widest uppercase rounded-sm',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  )
}
