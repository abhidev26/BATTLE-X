import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, Zap, Trophy, Gift, Info, X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Toast notification for BATTLEZONE X
 * Slides in from top-right, auto-dismisses after 5 seconds
 * Each type has unique icon, accent color, and border
 */
const typeConfig = {
  MATCH_FOUND: {
    icon: Target,
    label: 'Match Found',
    border: 'border-l-bz-red',
    iconClass: 'text-bz-red bg-bz-red/10',
    titleClass: 'text-bz-red',
    glow: 'shadow-red-glow-sm',
  },
  LEVEL_UP: {
    icon: Zap,
    label: 'Level Up!',
    border: 'border-l-bz-gold',
    iconClass: 'text-bz-gold bg-bz-gold/10',
    titleClass: 'text-bz-gold',
    glow: 'shadow-[0_0_12px_rgba(255,200,0,0.2)]',
  },
  ACHIEVEMENT: {
    icon: Trophy,
    label: 'Achievement',
    border: 'border-l-bz-gold',
    iconClass: 'text-bz-gold bg-bz-gold/10',
    titleClass: 'text-bz-gold',
    glow: 'shadow-[0_0_12px_rgba(255,200,0,0.2)]',
  },
  REWARD: {
    icon: Gift,
    label: 'Reward',
    border: 'border-l-bz-green',
    iconClass: 'text-bz-green bg-bz-green/10',
    titleClass: 'text-bz-green',
    glow: 'shadow-[0_0_12px_rgba(0,255,128,0.15)]',
  },
  SYSTEM: {
    icon: Info,
    label: 'System',
    border: 'border-l-cyan-400',
    iconClass: 'text-cyan-400 bg-cyan-500/10',
    titleClass: 'text-cyan-400',
    glow: 'shadow-[0_0_12px_rgba(0,200,255,0.15)]',
  },
}

export default function Notification({ type = 'SYSTEM', message, onDismiss }) {
  const config = typeConfig[type] ?? typeConfig.SYSTEM
  const IconComponent = config.icon

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => onDismiss?.(), 5000)
    return () => clearTimeout(timer)
  }, [onDismiss])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      role="alert"
      aria-live="polite"
      aria-label={`${config.label}: ${message}`}
      className={clsx(
        'relative flex items-start gap-3 w-80',
        'bg-bz-surface border border-bz-border border-l-4 rounded-lg p-4',
        'cursor-pointer select-none',
        config.border,
        config.glow
      )}
      onClick={onDismiss}
    >
      {/* Icon */}
      <div className={clsx('flex-shrink-0 w-8 h-8 rounded flex items-center justify-center', config.iconClass)}>
        <IconComponent size={15} aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pr-4">
        <p className={clsx('text-xs font-display tracking-widest uppercase mb-0.5', config.titleClass)}>
          {config.label}
        </p>
        <p className="text-sm text-bz-white font-sans leading-snug">{message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onDismiss?.() }}
        aria-label="Dismiss notification"
        className="absolute top-3 right-3 text-bz-gray hover:text-bz-white transition-colors duration-150"
      >
        <X size={13} />
      </button>

      {/* Progress bar draining over 5s */}
      <motion.div
        className={clsx('absolute bottom-0 left-0 h-[2px] rounded-b-lg', {
          'bg-bz-red': type === 'MATCH_FOUND',
          'bg-bz-gold': type === 'LEVEL_UP' || type === 'ACHIEVEMENT',
          'bg-bz-green': type === 'REWARD',
          'bg-cyan-400': type === 'SYSTEM',
        })}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: 5, ease: 'linear' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}
