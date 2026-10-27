import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Lock, Check, Zap, Star, Filter } from 'lucide-react'
import { clsx } from 'clsx'
import { mockAchievements } from '@/utils/mockData'

// ─── Constants ─────────────────────────────────────────────────────────────────

const FILTERS = ['ALL', 'UNLOCKED', 'LOCKED', 'DAILY', 'WEEKLY', 'SEASONAL']

const RARITY_CONFIG = {
  LEGENDARY: {
    badge: 'text-bz-gold bg-bz-gold/10 border border-bz-gold/40',
    glow: 'border-bz-gold/50 shadow-[0_0_18px_rgba(255,215,0,0.2)]',
    top: 'bg-bz-gold',
  },
  EPIC: {
    badge: 'text-purple-400 bg-purple-400/10 border border-purple-400/30',
    glow: 'border-purple-400/40',
    top: 'bg-purple-400',
  },
  RARE: {
    badge: 'text-blue-400 bg-blue-400/10 border border-blue-400/30',
    glow: 'border-blue-400/30',
    top: 'bg-blue-400',
  },
  COMMON: {
    badge: 'badge-gray',
    glow: 'border-bz-border',
    top: 'bg-bz-gray/40',
  },
}

// ─── Sub-components ─────────────────────────────────────────────────────────────

function RarityBadge({ rarity }) {
  const c = RARITY_CONFIG[rarity] || RARITY_CONFIG.COMMON
  return (
    <span className={clsx('px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase', c.badge)}>
      {rarity}
    </span>
  )
}

function AchievementCard({ achievement, index }) {
  const { unlocked, rarity, icon, name, description, unlockedAt, xpReward, progress, total } = achievement
  const rc = RARITY_CONFIG[rarity] || RARITY_CONFIG.COMMON
  const pct = Math.min((progress / total) * 100, 100)
  const isLegendary = rarity === 'LEGENDARY'

  return (
    <motion.div
      className={clsx(
        'card relative overflow-hidden p-5 flex flex-col gap-3 transition-all duration-300',
        unlocked ? rc.glow : 'border-bz-border opacity-70',
        isLegendary && unlocked ? 'animate-pulse-border' : ''
      )}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileHover={{ scale: 1.03, y: -4 }}
    >
      {/* Rarity top line */}
      <div className={clsx('absolute top-0 left-0 right-0 h-0.5', rc.top)} />

      {/* Legendary glow ring (animated) */}
      {isLegendary && unlocked && (
        <motion.div
          className="absolute inset-0 rounded-lg border border-bz-gold/20 pointer-events-none"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      {/* Lock overlay */}
      {!unlocked && (
        <div className="absolute top-3 right-3 z-10">
          <div className="p-1 rounded bg-bz-surface2 border border-bz-border">
            <Lock size={11} className="text-bz-gray" />
          </div>
        </div>
      )}

      {/* Unlocked check */}
      {unlocked && (
        <div className="absolute top-3 right-3 z-10">
          <div className="p-1 rounded-full bg-bz-green/20 border border-bz-green/40">
            <Check size={11} className="text-bz-green" />
          </div>
        </div>
      )}

      {/* Icon */}
      <div className={clsx(
        'text-5xl text-center select-none py-2 transition-all',
        !unlocked && 'grayscale brightness-50'
      )}>
        {icon}
      </div>

      {/* Name & Description */}
      <div className="text-center">
        <h3 className={clsx(
          'font-display text-sm font-bold mb-1',
          unlocked ? (isLegendary ? 'text-bz-gold' : 'text-bz-white') : 'text-bz-gray'
        )}>
          {name}
        </h3>
        <p className="text-bz-gray text-[10px] font-sans leading-relaxed">{description}</p>
      </div>

      {/* Rarity */}
      <div className="flex justify-center">
        <RarityBadge rarity={rarity} />
      </div>

      {/* Unlocked info / Locked progress */}
      {unlocked ? (
        <div className="text-center space-y-0.5">
          <p className="text-bz-green text-[10px] font-mono">✓ UNLOCKED {unlockedAt}</p>
          <p className="text-bz-gold text-[11px] font-mono font-bold flex items-center justify-center gap-1">
            <Zap size={9} />
            +{xpReward.toLocaleString()} XP EARNED
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-bz-gray">{progress}/{total}</span>
            <span className="text-bz-gray flex items-center gap-1">
              <Zap size={9} className="text-bz-gold opacity-60" />
              {xpReward.toLocaleString()} XP
            </span>
          </div>
          <div className="stat-bar">
            <motion.div
              className="stat-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
            />
          </div>
          <p className="text-bz-gray text-[9px] font-mono text-center">{pct.toFixed(0)}% COMPLETE</p>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function Achievements() {
  const [activeFilter, setActiveFilter] = useState('ALL')

  const unlocked = mockAchievements.filter(a => a.unlocked)
  const totalXP = unlocked.reduce((sum, a) => sum + a.xpReward, 0)
  const progressPct = (unlocked.length / mockAchievements.length) * 100

  const filtered = useMemo(() => {
    switch (activeFilter) {
      case 'UNLOCKED': return mockAchievements.filter(a => a.unlocked)
      case 'LOCKED': return mockAchievements.filter(a => !a.unlocked)
      // DAILY/WEEKLY/SEASONAL not in mockData, show subset for demo
      case 'DAILY': return mockAchievements.filter(a => ['a001', 'a002'].includes(a.id))
      case 'WEEKLY': return mockAchievements.filter(a => ['a003', 'a005', 'a006'].includes(a.id))
      case 'SEASONAL': return mockAchievements.filter(a => ['a004', 'a007'].includes(a.id))
      default: return mockAchievements
    }
  }, [activeFilter])

  return (
    <div className="min-h-screen bg-bz-black text-bz-white pb-20">

      {/* ── Header ── */}
      <div className="relative bg-bz-surface border-b border-bz-border overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bz-red to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-bz-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bz-red/10 border border-bz-red/30">
                <Award size={28} className="text-bz-red" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-gradient-red tracking-wider">
                  ACHIEVEMENTS
                </h1>
                <p className="text-bz-gold text-xs font-mono mt-1 flex items-center gap-1.5">
                  <Zap size={10} />
                  {totalXP.toLocaleString()} XP EARNED
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="w-full sm:w-64">
              <div className="flex justify-between text-xs font-mono mb-2">
                <span className="text-bz-gray uppercase tracking-wider">PROGRESS</span>
                <span className="text-bz-white font-bold">
                  {unlocked.length}/{mockAchievements.length} UNLOCKED
                </span>
              </div>
              <div className="h-3 bg-bz-surface2 rounded-full border border-bz-border overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-bz-red to-bz-red/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </div>
              <p className="text-bz-gray text-[10px] font-mono mt-1 text-right">{progressPct.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Summary Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'TOTAL', value: mockAchievements.length, icon: Award, color: 'text-bz-white' },
            { label: 'UNLOCKED', value: unlocked.length, icon: Check, color: 'text-bz-green' },
            { label: 'LOCKED', value: mockAchievements.length - unlocked.length, icon: Lock, color: 'text-bz-gray' },
            { label: 'XP EARNED', value: `${(totalXP / 1000).toFixed(1)}K`, icon: Zap, color: 'text-bz-gold' },
          ].map(stat => (
            <motion.div
              key={stat.label}
              className="card p-4 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 rounded-lg bg-bz-surface2 border border-bz-border">
                <stat.icon size={14} className={stat.color} />
              </div>
              <div>
                <p className={clsx('font-mono text-xl font-black', stat.color)}>{stat.value}</p>
                <p className="text-bz-gray text-[10px] font-mono uppercase">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Filter Tabs ── */}
        <div className="flex border-b border-bz-border overflow-x-auto">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={clsx(
                'px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-widest whitespace-nowrap relative transition-all',
                activeFilter === f ? 'text-bz-red' : 'text-bz-gray hover:text-bz-white'
              )}
            >
              {f}
              {/* Count bubble */}
              {f === 'UNLOCKED' && (
                <span className="ml-1.5 badge-green text-[8px]">{unlocked.length}</span>
              )}
              {f === 'LOCKED' && (
                <span className="ml-1.5 badge-gray text-[8px]">{mockAchievements.length - unlocked.length}</span>
              )}
              {activeFilter === f && (
                <motion.div
                  layoutId="achTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-bz-red"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Achievements Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-bz-gray">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-mono text-sm uppercase tracking-wider">NO ACHIEVEMENTS IN THIS CATEGORY</p>
              </div>
            ) : (
              filtered.map((ach, idx) => (
                <AchievementCard key={ach.id} achievement={ach} index={idx} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
