import { motion } from 'framer-motion'
import { clsx } from 'clsx'

/**
 * Rarity badge for weapons and items in BATTLEZONE X
 * COMMON > RARE > EPIC > LEGENDARY tiers with appropriate visual weight
 */
const rarityConfig = {
  COMMON: {
    label: 'Common',
    className: 'bg-bz-surface border border-bz-border text-bz-gray',
    glow: false,
  },
  RARE: {
    label: 'Rare',
    className: 'bg-blue-500/15 border border-blue-500/40 text-blue-400',
    glow: false,
  },
  EPIC: {
    label: 'Epic',
    className: 'bg-purple-500/15 border border-purple-500/40 text-purple-400',
    glow: false,
  },
  LEGENDARY: {
    label: 'Legendary',
    className: 'bg-bz-gold/10 border border-bz-gold/50 text-bz-gold',
    glow: true,
  },
}

export default function RarityBadge({ rarity = 'COMMON', className }) {
  const config = rarityConfig[rarity] ?? rarityConfig.COMMON

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={clsx(
        config.className,
        config.glow && 'shadow-[0_0_8px_rgba(255,200,0,0.35)]',
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm',
        'text-[10px] font-display tracking-widest uppercase',
        className
      )}
      aria-label={`Rarity: ${config.label}`}
    >
      {config.glow && (
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-bz-gold"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          aria-hidden="true"
        />
      )}
      {config.label}
    </motion.span>
  )
}
