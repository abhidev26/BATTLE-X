import { motion } from 'framer-motion'
import { clsx } from 'clsx'

/**
 * Animated XP/stat progress bar
 * Fills from 0 to value% on mount via framer motion
 */
const colorMap = {
  red: 'bg-bz-red shadow-[0_0_8px_rgba(255,26,26,0.5)]',
  gold: 'bg-bz-gold shadow-[0_0_8px_rgba(255,200,0,0.4)]',
  green: 'bg-bz-green shadow-[0_0_8px_rgba(0,255,128,0.4)]',
}

const heightMap = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export default function ProgressBar({
  value = 0,
  label,
  color = 'red',
  showPercent = true,
  height = 'md',
  animated = true,
  className,
}) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={clsx('w-full', className)} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-xs font-display tracking-wider text-bz-gray uppercase">
              {label}
            </span>
          )}
          {showPercent && (
            <span className="text-xs font-mono text-bz-white tabular-nums">
              {clamped}%
            </span>
          )}
        </div>
      )}

      {/* Track */}
      <div className={clsx('w-full rounded-full bg-bz-surface2 border border-bz-border overflow-hidden', heightMap[height])}>
        {/* Fill */}
        <motion.div
          className={clsx('h-full rounded-full', colorMap[color])}
          initial={{ width: '0%' }}
          animate={{ width: `${clamped}%` }}
          transition={
            animated
              ? { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }
              : { duration: 0 }
          }
        />
      </div>
    </div>
  )
}
