import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Animated number counter hook
 * Counts from 0 to target value on mount
 */
function useCountUp(target, duration = 1200) {
  const ref = useRef(null)
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { duration, bounce: 0 })

  useEffect(() => {
    motionVal.set(target)
    const unsubscribe = spring.on('change', (latest) => {
      if (ref.current) {
        const formatted =
          typeof target === 'number' && target >= 1000
            ? Math.round(latest).toLocaleString()
            : typeof target === 'string'
            ? target // pass-through strings like "98.2%"
            : Number.isInteger(target)
            ? Math.round(latest)
            : latest.toFixed(1)
        ref.current.textContent = formatted
      }
    })
    return unsubscribe
  }, [target, spring, motionVal])

  return ref
}

const colorMap = {
  red: 'text-bz-red',
  gold: 'text-bz-gold',
  green: 'text-bz-green',
  cyan: 'text-cyan-400',
  gray: 'text-bz-gray',
}

const iconColorMap = {
  red: 'bg-bz-red/10 text-bz-red border border-bz-red/20',
  gold: 'bg-bz-gold/10 text-bz-gold border border-bz-gold/20',
  green: 'bg-green-500/10 text-bz-green border border-green-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
  gray: 'bg-bz-surface2 text-bz-gray border border-bz-border',
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  change,
  color = 'red',
  className,
}) {
  // Only animate numeric values
  const isNumeric = typeof value === 'number'
  const countRef = useCountUp(isNumeric ? value : 0)

  const TrendIcon =
    change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus
  const trendColor =
    change > 0 ? 'text-bz-green' : change < 0 ? 'text-bz-red' : 'text-bz-gray'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx('card relative overflow-hidden group', className)}
      role="region"
      aria-label={`${label} stat`}
    >
      {/* Top accent line */}
      <div className={clsx('absolute top-0 left-0 right-0 h-[2px]', `bg-${color === 'red' ? 'bz-red' : color === 'gold' ? 'bz-gold' : color === 'green' ? 'bz-green' : color === 'cyan' ? 'cyan-400' : 'bz-border'}`)} />

      <div className="flex items-start justify-between mb-3">
        <span className="text-muted text-xs font-display tracking-widest uppercase">
          {label}
        </span>
        {Icon && (
          <div className={clsx('w-8 h-8 rounded flex items-center justify-center', iconColorMap[color])}>
            <Icon size={14} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <span
          ref={isNumeric ? countRef : undefined}
          className={clsx('font-mono text-2xl font-bold leading-none', colorMap[color])}
          aria-label={`${label}: ${value}`}
        >
          {isNumeric ? '0' : value}
        </span>

        {change !== undefined && (
          <div className={clsx('flex items-center gap-1 text-xs font-mono', trendColor)}>
            <TrendIcon size={12} aria-hidden="true" />
            <span>
              {change > 0 ? '+' : ''}
              {change}
            </span>
          </div>
        )}
      </div>

      {/* Subtle background glow on hover */}
      <div
        className={clsx(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[inherit]',
          color === 'red' ? 'bg-bz-red/[0.03]' : color === 'gold' ? 'bg-bz-gold/[0.03]' : 'bg-bz-green/[0.03]'
        )}
        aria-hidden="true"
      />
    </motion.div>
  )
}
