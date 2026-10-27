import { motion } from 'framer-motion'
import { clsx } from 'clsx'

/**
 * Reusable Card component for BATTLEZONE X
 * Supports default, hover, glass, and red variants with optional glow
 */
const variantMap = {
  default: 'card',
  hover: 'card-hover',
  glass: 'card-glass',
  red: 'card-red',
}

export default function Card({
  variant = 'default',
  glow = false,
  className,
  children,
  onClick,
  ...rest
}) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        variantMap[variant],
        glow && 'shadow-red-glow border-bz-red/40',
        onClick && 'cursor-pointer',
        className
      )}
      {...rest}
    >
      {/* Animated glow border pulse when glow=true */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] border border-bz-red/20 pointer-events-none"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}
      {children}
    </motion.div>
  )
}
