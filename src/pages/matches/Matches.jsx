import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import {
  Trophy, Skull, Zap, Clock, MapPin, Filter,
  ChevronRight, TrendingUp, Star, Target, Calendar,
} from 'lucide-react'
import { mockMatches, mockPlayer } from '@/utils/mockData'

// ─── Constants ──────────────────────────────────────────────────────────────

const MODES = ['ALL', 'SOLO', 'DUO', 'SQUAD', 'TDM']
const RESULTS = ['ALL', 'WIN', 'LOSS']
const MAPS = ['ALL', 'CRIMSON VALLEY', 'IRON FORTRESS', 'SHADOW DESERT', 'CYBER GRID', 'NEON ARENA']

const MODE_COLORS = {
  SOLO: 'badge-cyan',
  DUO: 'badge-gold',
  SQUAD: 'badge-green',
  'TEAM DEATHMATCH': 'badge-red',
  TDM: 'badge-red',
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FilterChip({ label, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        'px-3 py-1.5 text-xs font-mono font-semibold tracking-wider border transition-all duration-200',
        active
          ? 'bg-bz-red text-white border-bz-red shadow-red-glow-sm'
          : 'bg-transparent text-bz-gray border-bz-border hover:border-bz-red/50 hover:text-bz-white'
      )}
    >
      {label}
    </motion.button>
  )
}

function PlacementBadge({ placement }) {
  if (placement === 1) {
    return (
      <div className="flex items-center gap-1 px-2 py-0.5 bg-bz-gold/20 border border-bz-gold/40 rounded font-mono text-xs font-bold text-bz-gold">
        <Trophy className="w-3 h-3" />
        #1
      </div>
    )
  }
  return (
    <div className={clsx(
      'px-2 py-0.5 border rounded font-mono text-xs font-bold',
      placement <= 5
        ? 'bg-bz-green/10 border-bz-green/30 text-bz-green'
        : 'bg-white/5 border-bz-border text-bz-gray'
    )}>
      #{placement}
    </div>
  )
}

function MatchCard({ match, index }) {
  const [expanded, setExpanded] = useState(false)
  const isWin = match.result === 'WIN'
  const modeDisplay = match.mode === 'TEAM DEATHMATCH' ? 'TDM' : match.mode

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className={clsx(
        'relative bg-bz-surface border border-bz-border rounded overflow-hidden card-hover group',
        'hover:border-bz-border/80 transition-all duration-200'
      )}
    >
      {/* Win/Loss left border */}
      <div
        className={clsx(
          'absolute left-0 top-0 bottom-0 w-1',
          isWin ? 'bg-bz-green' : 'bg-bz-red'
        )}
      />

      <div className="pl-5 pr-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Result indicator */}
          <div className={clsx(
            'flex-shrink-0 w-16 text-center py-1 rounded text-xs font-display font-bold tracking-widest',
            isWin
              ? 'bg-bz-green/10 border border-bz-green/30 text-bz-green'
              : 'bg-bz-red/10 border border-bz-red/30 text-bz-red'
          )}>
            {match.result}
          </div>

          {/* Mode + Map */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={clsx('text-xs font-mono font-bold px-2 py-0.5 rounded border', MODE_COLORS[match.mode] || 'badge-gray')}>
                {modeDisplay}
              </span>
              <span className="font-display text-sm text-bz-white font-semibold tracking-wide truncate">
                {match.map}
              </span>
            </div>
            <div className="flex items-center gap-3 text-bz-gray text-xs font-mono">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {match.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {match.duration}
              </span>
            </div>
          </div>

          {/* Core stats */}
          <div className="flex items-center gap-4 flex-wrap">
            <PlacementBadge placement={match.placement} />

            <div className="text-center">
              <div className="flex items-center gap-1 text-bz-white font-mono font-bold text-sm">
                <Skull className="w-3.5 h-3.5 text-bz-red" />
                {match.kills}
              </div>
              <div className="text-bz-gray text-xs">KILLS</div>
            </div>

            <div className="text-center">
              <div className="font-mono font-bold text-sm text-bz-white">{match.damage.toLocaleString()}</div>
              <div className="text-bz-gray text-xs">DMG</div>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-1 text-bz-gold font-mono font-bold text-sm">
                <Zap className="w-3 h-3" />
                +{match.xpEarned}
              </div>
              <div className="text-bz-gray text-xs">XP</div>
            </div>

            {/* Details button */}
            <motion.button
              onClick={() => setExpanded(e => !e)}
              className="btn-ghost text-xs px-3 py-1.5 flex items-center gap-1 ml-auto sm:ml-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DETAILS
              <ChevronRight className={clsx('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
            </motion.button>
          </div>
        </div>

        {/* Expanded detail panel */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pt-4 border-t border-bz-border grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { label: 'PLACEMENT', value: `#${match.placement}`, icon: Trophy },
                { label: 'KILLS', value: match.kills, icon: Skull },
                { label: 'DAMAGE DEALT', value: match.damage.toLocaleString(), icon: Target },
                { label: 'XP EARNED', value: `+${match.xpEarned}`, icon: Zap },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="hud-panel p-3 text-center">
                  <Icon className="w-4 h-4 text-bz-red mx-auto mb-1" />
                  <div className="font-mono font-bold text-bz-white text-sm">{value}</div>
                  <div className="font-mono text-bz-gray text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function SummaryCard({ label, value, icon: Icon, accent }) {
  return (
    <motion.div
      className="card p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-10 h-10 rounded bg-bz-red/10 border border-bz-red/30 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-bz-red" />
      </div>
      <div>
        <div className={clsx('font-mono font-bold text-xl', accent || 'text-bz-white')}>{value}</div>
        <div className="text-bz-gray text-xs font-mono tracking-wide">{label}</div>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Matches() {
  const [modeFilter, setModeFilter] = useState('ALL')
  const [resultFilter, setResultFilter] = useState('ALL')
  const [mapFilter, setMapFilter] = useState('ALL')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => {
    return mockMatches.filter(m => {
      const modeMatch = modeFilter === 'ALL' ||
        m.mode === modeFilter ||
        (modeFilter === 'TDM' && m.mode === 'TEAM DEATHMATCH')
      const resultMatch = resultFilter === 'ALL' || m.result === resultFilter
      const mapMatch = mapFilter === 'ALL' || m.map === mapFilter
      const dateMatch = !dateFilter || m.date === dateFilter
      return modeMatch && resultMatch && mapMatch && dateMatch
    })
  }, [modeFilter, resultFilter, mapFilter, dateFilter])

  // ── Summary computations ──
  const totalXP = mockMatches.reduce((s, m) => s + m.xpEarned, 0)
  const bestPlacement = Math.min(...mockMatches.map(m => m.placement))
  const mostKills = Math.max(...mockMatches.map(m => m.kills))
  const wins = mockMatches.filter(m => m.result === 'WIN').length
  const winRate = ((wins / mockMatches.length) * 100).toFixed(0)

  return (
    <div className="min-h-full bg-bz-black p-4 sm:p-6 lg:p-8">
      {/* ── Page Header ── */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-bz-red" />
              <h1 className="font-display text-2xl sm:text-3xl font-black text-bz-white tracking-widest">
                MATCH HISTORY
              </h1>
            </div>
            <p className="text-bz-gray text-sm font-mono ml-4 pl-1">
              Combat records for {mockPlayer.username}
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 flex-wrap">
            {[
              { label: 'MATCHES', value: mockMatches.length },
              { label: 'WINS', value: wins },
              { label: 'WIN RATE', value: `${winRate}%` },
            ].map(({ label, value }) => (
              <div key={label} className="text-center hud-panel px-4 py-2 min-w-[70px]">
                <div className="font-mono font-bold text-lg text-bz-white">{value}</div>
                <div className="text-bz-gray text-xs font-mono">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Red accent line */}
        <div className="mt-4 h-px bg-gradient-to-r from-bz-red via-bz-red/30 to-transparent" />
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        className="bg-bz-surface border border-bz-border rounded p-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-bz-red" />
          <span className="font-mono text-xs text-bz-gray tracking-widest uppercase">Filters</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Mode filter */}
          <div>
            <div className="text-bz-gray text-xs font-mono mb-2 tracking-wide">MODE</div>
            <div className="flex gap-1 flex-wrap">
              {MODES.map(m => (
                <FilterChip key={m} label={m} active={modeFilter === m} onClick={() => setModeFilter(m)} />
              ))}
            </div>
          </div>

          {/* Result filter */}
          <div>
            <div className="text-bz-gray text-xs font-mono mb-2 tracking-wide">RESULT</div>
            <div className="flex gap-1">
              {RESULTS.map(r => (
                <FilterChip key={r} label={r} active={resultFilter === r} onClick={() => setResultFilter(r)} />
              ))}
            </div>
          </div>

          {/* Map filter */}
          <div>
            <div className="text-bz-gray text-xs font-mono mb-2 tracking-wide">MAP</div>
            <select
              value={mapFilter}
              onChange={e => setMapFilter(e.target.value)}
              className="input text-xs py-1.5 font-mono"
            >
              {MAPS.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          {/* Date filter */}
          <div>
            <div className="text-bz-gray text-xs font-mono mb-2 tracking-wide">DATE</div>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="input text-xs py-1.5 font-mono"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Match List ── */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs text-bz-gray tracking-widest">
            {filtered.length} MATCH{filtered.length !== 1 ? 'ES' : ''} FOUND
          </span>
          {filtered.length < mockMatches.length && (
            <button
              className="text-xs text-bz-red font-mono hover:underline"
              onClick={() => { setModeFilter('ALL'); setResultFilter('ALL'); setMapFilter('ALL'); setDateFilter('') }}
            >
              CLEAR FILTERS
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i} />
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="hud-panel p-12 text-center"
            >
              <Target className="w-10 h-10 text-bz-gray/40 mx-auto mb-3" />
              <p className="font-display text-bz-gray tracking-widest text-sm">NO MATCHES FOUND</p>
              <p className="text-bz-gray/50 text-xs font-mono mt-1">Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Summary Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-5 bg-bz-red/60" />
          <h2 className="font-display text-sm font-bold text-bz-gray tracking-widest">CAREER SUMMARY</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SummaryCard label="TOTAL XP EARNED" value={`+${totalXP.toLocaleString()} XP`} icon={Zap} accent="text-bz-gold" />
          <SummaryCard label="BEST PLACEMENT" value={`#${bestPlacement}`} icon={Trophy} accent="text-bz-gold" />
          <SummaryCard label="MOST KILLS IN MATCH" value={mostKills} icon={Skull} accent="text-bz-red" />
        </div>
      </motion.div>
    </div>
  )
}
