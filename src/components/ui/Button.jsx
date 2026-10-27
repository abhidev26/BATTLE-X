import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Reusable Button component for BATTLEZONE X
 * Supports multiple variants, sizes, loading state, and icon slot
 */
const variantMap = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
}

const sizeMap = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-5 py-2.5 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  children,
  className,
  type = 'button',
  ...rest
}) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={clsx(
        variantMap[variant],
        sizeMap[size],
        'inline-flex items-center justify-center font-display tracking-wider uppercase',
        'transition-all duration-200',
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2
          className="animate-spin"
          size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15}
          aria-hidden="true"
        />
      ) : Icon ? (
        <Icon size={size === 'sm' ? 12 : size === 'lg' ? 18 : 15} aria-hidden="true" />
      ) : null}
      {children}
    </motion.button>
  )
}
