import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Trophy, Crown, TrendingUp, TrendingDown, Minus,
  ChevronDown, RefreshCw, Star, Zap
} from 'lucide-react'
import { clsx } from 'clsx'
import { mockLeaderboard, mockPlayer } from '@/utils/mockData'

// ─── Constants ─────────────────────────────────────────────────────────────────

const TABS = ['GLOBAL', 'WEEKLY', 'MONTHLY', 'FRIENDS']

// ─── Sub-components ────────────────────────────────────────────────────────────

function RankBadge({ rank }) {
  if (rank === 1) return (
    <span className="inline-flex items-center gap-1 font-mono text-sm font-black text-bz-gold">
      <Crown size={14} className="text-bz-gold" />
      #1
    </span>
  )
  if (rank === 2) return <span className="font-mono text-sm font-black text-gray-300">#2</span>
  if (rank === 3) return <span className="font-mono text-sm font-black text-amber-600">#3</span>
  return <span className="font-mono text-sm font-bold text-bz-gray">#{rank}</span>
}

function ChangeIndicator({ change }) {
  if (change > 0) return (
    <span className="flex items-center gap-0.5 text-bz-green font-mono text-xs font-bold">
      <TrendingUp size={11} /> {change}
    </span>
  )
  if (change < 0) return (
    <span className="flex items-center gap-0.5 text-bz-red font-mono text-xs font-bold">
      <TrendingDown size={11} /> {Math.abs(change)}
    </span>
  )
  return <Minus size={11} className="text-bz-gray" />
}

function PodiumCard({ entry, position, height }) {
  const colors = {
    1: { border: 'border-bz-gold/50', glow: 'shadow-[0_0_20px_rgba(255,215,0,0.2)]', text: 'text-bz-gold', bg: 'bg-bz-gold/10' },
    2: { border: 'border-gray-400/40', glow: '', text: 'text-gray-300', bg: 'bg-gray-400/10' },
    3: { border: 'border-amber-700/40', glow: '', text: 'text-amber-600', bg: 'bg-amber-700/10' },
  }
  const c = colors[position]

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: position === 1 ? 0 : position === 2 ? 0.1 : 0.2, duration: 0.5 }}
    >
      {/* Avatar */}
      <div className={clsx(
        'relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex items-center justify-center mb-2 text-3xl',
        c.border, c.glow, c.bg
      )}>
        👤
        {position === 1 && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <Crown size={20} className="text-bz-gold" />
          </div>
        )}
        <span className={clsx(
          'absolute -bottom-2.5 left-1/2 -translate-x-1/2',
          'w-6 h-6 rounded-full border-2 border-bz-black flex items-center justify-center font-mono text-[10px] font-black',
          c.text, c.bg, c.border
        )}>
          {position}
        </span>
      </div>

      {/* Info */}
      <div className="text-center mt-3 mb-2">
        <p className={clsx('font-display text-sm font-bold', c.text)}>{entry.username}</p>
        <p className="text-bz-gray text-[10px] font-mono">LVL {entry.level}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-3 text-center mb-3">
        <div>
          <p className="font-mono text-xs font-bold text-bz-white">{entry.wins.toLocaleString()}</p>
          <p className="text-bz-gray text-[9px] font-mono">WINS</p>
        </div>
        <div>
          <p className="font-mono text-xs font-bold text-bz-white">{entry.kd}</p>
          <p className="text-bz-gray text-[9px] font-mono">K/D</p>
        </div>
      </div>

      {/* Platform bar */}
      <motion.div
        className={clsx('w-24 sm:w-32 rounded-t-md', c.bg, 'border border-b-0', c.border)}
        initial={{ height: 0 }}
        animate={{ height }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const playerRowRef = useRef(null)

  const entries = mockLeaderboard
  const top3 = entries.slice(0, 3)
  const tableRows = showAll ? entries : entries.slice(0, 10)

  const scrollToPlayer = () => {
    playerRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const currentPlayer = entries.find(e => e.isCurrentPlayer)

  return (
    <div className="min-h-screen bg-bz-black text-bz-white pb-24">

      {/* ── Header ── */}
      <div className="relative bg-bz-surface border-b border-bz-border overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bz-gold to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-16 right-0 w-64 h-64 bg-bz-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-bz-gold/10 border border-bz-gold/30">
                <Trophy size={28} className="text-bz-gold" />
              </div>
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-bz-white tracking-wider">
                  GLOBAL RANKINGS
                </h1>
                <p className="text-bz-gray text-xs font-mono mt-1">
                  Updated every hour · <span className="text-bz-gold font-bold">SEASON 5</span>
                </p>
              </div>
            </div>
            <motion.button
              className="btn-ghost flex items-center gap-2 text-xs"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={12} />
              REFRESH
            </motion.button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Category Tabs ── */}
        <div className="flex border-b border-bz-border">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={clsx(
                'px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest relative transition-all',
                activeTab === i ? 'text-bz-red' : 'text-bz-gray hover:text-bz-white'
              )}
            >
              {tab}
              {activeTab === i && (
                <motion.div
                  layoutId="lbTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-bz-red"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Top 3 Podium (desktop) ── */}
        <div className="hidden md:block">
          <div className="card p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-sm opacity-20" />
            <div className="relative flex justify-center items-end gap-6">
              {/* Silver (2) */}
              <PodiumCard entry={top3[1]} position={2} height={60} />
              {/* Gold (1) */}
              <PodiumCard entry={top3[0]} position={1} height={100} />
              {/* Bronze (3) */}
              <PodiumCard entry={top3[2]} position={3} height={40} />
            </div>
          </div>
        </div>

        {/* ── Leaderboard Table ── */}
        <div className="card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[50px_1fr_80px_80px_80px_70px_100px_60px] gap-2 px-4 py-3 bg-bz-surface2 border-b border-bz-border text-bz-gray text-[10px] font-mono uppercase tracking-wider">
            <div>RANK</div>
            <div>PLAYER</div>
            <div className="text-right">LEVEL</div>
            <div className="text-right">WINS</div>
            <div className="text-right">KILLS</div>
            <div className="text-right">K/D</div>
            <div className="text-right">XP</div>
            <div className="text-right">CHANGE</div>
          </div>

          <AnimatePresence>
            {tableRows.map((entry, idx) => (
              <motion.div
                key={entry.username}
                ref={entry.isCurrentPlayer ? playerRowRef : null}
                className={clsx(
                  'grid grid-cols-[50px_1fr_80px_80px_80px_70px_100px_60px] gap-2 px-4 py-3.5 border-b border-bz-border',
                  'items-center transition-colors hover:bg-bz-surface2/60',
                  entry.isCurrentPlayer
                    ? 'border-l-2 border-l-bz-red bg-bz-red/5 hover:bg-bz-red/8'
                    : 'border-l-2 border-l-transparent'
                )}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                {/* Rank */}
                <div><RankBadge rank={entry.rank} /></div>

                {/* Player */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className={clsx(
                    'w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-lg border',
                    entry.rank === 1 ? 'border-bz-gold/50 bg-bz-gold/10' :
                      entry.rank === 2 ? 'border-gray-400/40 bg-gray-400/10' :
                        entry.rank === 3 ? 'border-amber-700/40 bg-amber-700/10' :
                          'border-bz-border bg-bz-surface2'
                  )}>
                    👤
                  </div>
                  <div className="min-w-0">
                    <p className={clsx(
                      'font-display text-sm font-bold truncate',
                      entry.rank === 1 ? 'text-bz-gold' :
                        entry.rank === 2 ? 'text-gray-300' :
                          entry.rank === 3 ? 'text-amber-600' :
                            entry.isCurrentPlayer ? 'text-bz-red' : 'text-bz-white'
                    )}>
                      {entry.username}
                      {entry.badge && <span className="ml-1.5">{entry.badge}</span>}
                    </p>
                    {entry.isCurrentPlayer && (
                      <span className="text-[9px] font-mono text-bz-red uppercase">YOU</span>
                    )}
                  </div>
                </div>

                {/* Level */}
                <div className="text-right font-mono text-xs text-bz-white font-bold">{entry.level}</div>

                {/* Wins */}
                <div className="text-right font-mono text-xs text-bz-white">{entry.wins.toLocaleString()}</div>

                {/* Kills */}
                <div className="text-right font-mono text-xs text-bz-white">{entry.kills.toLocaleString()}</div>

                {/* K/D */}
                <div className="text-right font-mono text-xs text-bz-red font-bold">{entry.kd}</div>

                {/* XP */}
                <div className="text-right font-mono text-xs text-bz-gold">{entry.xp.toLocaleString()}</div>

                {/* Change */}
                <div className="flex justify-end">
                  <ChangeIndicator change={entry.change} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Load more */}
          {!showAll && entries.length > 10 && (
            <div className="p-4 flex justify-center">
              <motion.button
                className="btn-ghost flex items-center gap-2 text-sm"
                onClick={() => setShowAll(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <ChevronDown size={14} />
                LOAD MORE PLAYERS
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* ── Fixed Player Rank Bar ── */}
      {currentPlayer && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 bg-bz-surface/95 backdrop-blur-md border-t border-bz-red/30"
          initial={{ y: 60 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6 font-mono text-xs">
              <span className="text-bz-gray uppercase tracking-wider">YOUR RANK:</span>
              <span className="text-bz-red font-black text-lg">#{currentPlayer.rank}</span>
              <span className="text-bz-gray hidden sm:inline">|</span>
              <span className="text-bz-white font-bold hidden sm:inline">{currentPlayer.username}</span>
              <span className="text-bz-gray hidden md:inline">|</span>
              <span className="text-bz-gray hidden md:inline">K/D: <span className="text-bz-red font-bold">{currentPlayer.kd}</span></span>
              <span className="text-bz-gray hidden md:inline">|</span>
              <span className="text-bz-gray hidden md:inline">XP: <span className="text-bz-gold font-bold">{currentPlayer.xp.toLocaleString()}</span></span>
            </div>
            <motion.button
              onClick={scrollToPlayer}
              className="btn-outline text-xs flex items-center gap-1.5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Star size={11} />
              FIND MY RANK
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
