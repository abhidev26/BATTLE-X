import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Edit3, Calendar, Clock, Shield, Zap, Target, Skull, TrendingUp,
  Trophy, Lock, ChevronRight, Star, Award, Package
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { clsx } from 'clsx'
import {
  mockPlayer, mockMatches, mockAchievements, mockInventoryItems, mockWeapons
} from '@/utils/mockData'

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, accent }) {
  return (
    <motion.div
      className="card flex flex-col gap-2 p-4 relative overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute top-0 left-0 w-full h-0.5 bg-bz-red/40" />
      <div className="flex items-center gap-2 text-bz-gray text-xs font-mono uppercase tracking-widest">
        {Icon && <Icon size={12} />}
        {label}
      </div>
      <div className={clsx('font-mono text-2xl font-bold', accent || 'text-bz-white')}>
        {value}
      </div>
    </motion.div>
  )
}

function RarityBadge({ rarity }) {
  const map = {
    LEGENDARY: 'badge-gold',
    EPIC: 'text-purple-400 bg-purple-400/10 border border-purple-400/30 px-2 py-0.5 rounded text-xs font-mono uppercase',
    RARE: 'text-blue-400 bg-blue-400/10 border border-blue-400/30 px-2 py-0.5 rounded text-xs font-mono uppercase',
    COMMON: 'badge-gray',
  }
  return <span className={map[rarity] || 'badge-gray'}>{rarity}</span>
}

// Performance chart mock data – kills & wins over last 7 days
const chartData = [
  { day: 'Sep 24', kills: 6, wins: 0 },
  { day: 'Sep 25', kills: 11, wins: 1 },
  { day: 'Sep 26', kills: 4, wins: 0 },
  { day: 'Sep 27', kills: 9, wins: 1 },
  { day: 'Sep 28', kills: 22, wins: 1 },
  { day: 'Sep 29', kills: 15, wins: 1 },
  { day: 'Sep 30', kills: 12, wins: 1 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="hud-panel p-3 text-xs font-mono">
      <p className="text-bz-gray mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name.toUpperCase()}: {p.value}
        </p>
      ))}
    </div>
  )
}

const TABS = ['MATCH HISTORY', 'ACHIEVEMENTS', 'INVENTORY PREVIEW']

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0)
  const p = mockPlayer

  const equippedWeapon = mockWeapons.find(w => w.equipped)
  const equippedCharacter = mockInventoryItems.find(i => i.category === 'CHARACTERS' && i.equipped)
  const equippedBanner = mockInventoryItems.find(i => i.category === 'BANNERS' && i.equipped)
  const equippedBadge = mockInventoryItems.find(i => i.category === 'BADGES' && i.equipped)

  const rankColorMap = {
    BRONZE: 'text-amber-700', SILVER: 'text-gray-400', GOLD: 'text-bz-gold',
    PLATINUM: 'text-cyan-400', DIAMOND: 'text-blue-400', MASTER: 'text-purple-400',
    LEGEND: 'text-bz-red',
  }

  return (
    <div className="min-h-screen bg-bz-black text-bz-white pb-20">

      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden bg-bz-surface border-b border-bz-border">
        {/* Red gradient top line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bz-red to-transparent" />
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Red glow blob */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-bz-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Edit button top-right */}
          <div className="absolute top-6 right-6">
            <motion.button
              className="btn-ghost flex items-center gap-2 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Edit3 size={14} />
              EDIT PROFILE
            </motion.button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <motion.div
              className="relative shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg border-2 border-bz-red/60 bg-bz-surface2 flex items-center justify-center shadow-red-glow-sm overflow-hidden">
                <span className="text-5xl">👤</span>
              </div>
              {/* Online dot */}
              <span className="online-dot absolute bottom-1 right-1" />
            </motion.div>

            {/* Info */}
            <motion.div
              className="flex-1 text-center sm:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h1 className="font-display text-3xl sm:text-4xl font-black text-gradient-red tracking-wider">
                {p.username}
              </h1>
              <p className="text-bz-gray text-sm font-sans mb-3">{p.displayName}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-4">
                {/* Rank badge */}
                <div className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded border font-mono text-xs font-bold uppercase',
                  'border-bz-red/40 bg-bz-red/10',
                  rankColorMap[p.rank] || 'text-bz-white'
                )}>
                  <Shield size={12} />
                  {p.rankIcon} {p.rank}
                </div>
                {/* Level badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-bz-gold/40 bg-bz-gold/10 font-mono text-xs font-bold text-bz-gold uppercase">
                  <Star size={12} />
                  LVL {p.level}
                </div>
                {p.premium && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-purple-400/40 bg-purple-400/10 font-mono text-xs font-bold text-purple-400 uppercase">
                    <Zap size={12} />
                    PREMIUM
                  </div>
                )}
              </div>

              {/* Dates */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-bz-gray text-xs font-mono mb-5">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  JOINED {p.joinDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  LAST ACTIVE {p.lastActive}
                </span>
              </div>

              {/* Core stats inline */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-px bg-bz-border rounded overflow-hidden border border-bz-border w-fit mx-auto sm:mx-0">
                {[
                  { label: 'MATCHES', value: p.stats.matches.toLocaleString() },
                  { label: 'WINS', value: p.stats.wins.toLocaleString() },
                  { label: 'KILLS', value: p.stats.kills.toLocaleString() },
                  { label: 'K/D', value: p.stats.kdRatio },
                  { label: 'WIN RATE', value: `${p.stats.winRate}%` },
                ].map(s => (
                  <div key={s.label} className="flex flex-col items-center px-4 py-2 bg-bz-surface2">
                    <span className="font-mono text-base font-bold text-bz-white">{s.value}</span>
                    <span className="text-bz-gray text-[10px] font-mono uppercase tracking-wider">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Stats Grid ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-bz-red rounded-full" />
            <h2 className="heading-section">PERFORMANCE STATS</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="MATCHES" value={p.stats.matches.toLocaleString()} icon={Target} />
            <StatCard label="WINS" value={p.stats.wins.toLocaleString()} icon={Trophy} accent="text-bz-gold" />
            <StatCard label="KILLS" value={p.stats.kills.toLocaleString()} icon={Skull} accent="text-bz-red" />
            <StatCard label="DEATHS" value={p.stats.deaths.toLocaleString()} icon={Skull} />
            <StatCard label="K/D RATIO" value={p.stats.kdRatio} icon={TrendingUp} accent="text-bz-red" />
            <StatCard label="WIN RATE" value={`${p.stats.winRate}%`} icon={Award} accent="text-bz-gold" />
            <StatCard label="AVG DAMAGE" value={p.stats.avgDamage.toLocaleString()} icon={Zap} />
            <StatCard label="HEADSHOTS" value={p.stats.headshots.toLocaleString()} icon={Target} accent="text-purple-400" />
          </div>
        </section>

        {/* ── Performance Chart ── */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-5 bg-bz-red rounded-full" />
            <h2 className="heading-section">MATCH PERFORMANCE — LAST 7 DAYS</h2>
          </div>
          <div className="card p-4 sm:p-6">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="killsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#ff1a1a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="winsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffd700" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#ffd700" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
                <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'JetBrains Mono', color: '#888' }} />
                <Area type="monotone" dataKey="kills" stroke="#ff1a1a" strokeWidth={2} fill="url(#killsGrad)" dot={{ r: 3, fill: '#ff1a1a' }} />
                <Area type="monotone" dataKey="wins" stroke="#ffd700" strokeWidth={2} fill="url(#winsGrad)" dot={{ r: 3, fill: '#ffd700' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ── Tabs ── */}
        <section>
          {/* Tab Nav */}
          <div className="flex border-b border-bz-border mb-6 overflow-x-auto">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={clsx(
                  'px-4 py-3 text-xs font-mono font-bold uppercase tracking-widest transition-all whitespace-nowrap relative',
                  activeTab === i ? 'text-bz-red' : 'text-bz-gray hover:text-bz-white'
                )}
              >
                {tab}
                {activeTab === i && (
                  <motion.div
                    layoutId="tabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-bz-red"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* ── MATCH HISTORY ── */}
            {activeTab === 0 && (
              <motion.div
                key="matches"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="overflow-x-auto rounded-lg border border-bz-border">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="bg-bz-surface2 border-b border-bz-border">
                        {['DATE', 'MODE', 'MAP', 'PLACEMENT', 'KILLS', 'DAMAGE', 'RESULT', 'XP'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-bz-gray tracking-wider uppercase">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockMatches.map((m, idx) => (
                        <motion.tr
                          key={m.id}
                          className="border-b border-bz-border hover:bg-bz-surface2/50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.06 }}
                        >
                          <td className="px-4 py-3 text-bz-gray">{m.date}</td>
                          <td className="px-4 py-3 text-bz-white">{m.mode}</td>
                          <td className="px-4 py-3 text-bz-white">{m.map}</td>
                          <td className="px-4 py-3 text-bz-white font-bold">#{m.placement}</td>
                          <td className="px-4 py-3 text-bz-red font-bold">{m.kills}</td>
                          <td className="px-4 py-3 text-bz-white">{m.damage.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={clsx(
                              'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase',
                              m.result === 'WIN'
                                ? 'bg-bz-green/20 text-bz-green border border-bz-green/30'
                                : 'bg-bz-red/20 text-bz-red border border-bz-red/30'
                            )}>
                              {m.result}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-bz-gold">+{m.xpEarned}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ── ACHIEVEMENTS ── */}
            {activeTab === 1 && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {mockAchievements.map((ach, idx) => (
                  <motion.div
                    key={ach.id}
                    className={clsx(
                      'card p-4 relative overflow-hidden transition-all duration-300',
                      ach.unlocked ? '' : 'opacity-60',
                      ach.rarity === 'LEGENDARY' && ach.unlocked
                        ? 'border-bz-gold/40 shadow-[0_0_12px_rgba(255,215,0,0.15)]'
                        : ''
                    )}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                  >
                    {!ach.unlocked && (
                      <div className="absolute inset-0 bg-bz-black/40 flex items-start justify-end p-2 z-10 pointer-events-none">
                        <Lock size={14} className="text-bz-gray" />
                      </div>
                    )}
                    {ach.unlocked && (
                      <div className="absolute top-2 right-2">
                        <span className="text-bz-green text-base">✓</span>
                      </div>
                    )}
                    <div className={clsx('text-4xl mb-3 block text-center', !ach.unlocked && 'grayscale')}>{ach.icon}</div>
                    <p className="font-display text-xs font-bold text-bz-white mb-1 text-center">{ach.name}</p>
                    <p className="text-bz-gray text-[10px] font-sans text-center mb-3">{ach.description}</p>
                    <div className="flex justify-center mb-3">
                      <RarityBadge rarity={ach.rarity} />
                    </div>
                    {ach.unlocked ? (
                      <div className="text-center">
                        <p className="text-bz-green text-[10px] font-mono">UNLOCKED {ach.unlockedAt}</p>
                        <p className="text-bz-gold text-[10px] font-mono">+{ach.xpReward.toLocaleString()} XP</p>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between text-[10px] font-mono text-bz-gray mb-1">
                          <span>{ach.progress}/{ach.total}</span>
                          <span className="text-bz-gold">+{ach.xpReward.toLocaleString()} XP</span>
                        </div>
                        <div className="stat-bar">
                          <div
                            className="stat-bar-fill"
                            style={{ width: `${Math.min((ach.progress / ach.total) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── INVENTORY PREVIEW ── */}
            {activeTab === 2 && (
              <motion.div
                key="inventory"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'CHARACTER', icon: '🧑‍🚀', item: equippedCharacter },
                    { label: 'WEAPON', icon: '🔫', item: equippedWeapon ? { name: equippedWeapon.name, rarity: equippedWeapon.rarity } : null },
                    { label: 'BANNER', icon: '🚩', item: equippedBanner },
                    { label: 'BADGE', icon: '🏅', item: equippedBadge },
                  ].map(slot => (
                    <motion.div
                      key={slot.label}
                      className={clsx(
                        'card p-5 flex flex-col items-center gap-3 text-center',
                        slot.item ? 'border-bz-red/30' : 'border-dashed border-bz-border'
                      )}
                      whileHover={{ scale: 1.04 }}
                    >
                      <div className="text-4xl">{slot.icon}</div>
                      <div className="text-[10px] font-mono text-bz-gray uppercase tracking-widest">{slot.label}</div>
                      {slot.item ? (
                        <>
                          <p className="font-display text-xs text-bz-white font-bold">{slot.item.name}</p>
                          <RarityBadge rarity={slot.item.rarity} />
                          <span className="badge-green text-[9px]">EQUIPPED</span>
                        </>
                      ) : (
                        <p className="text-bz-gray text-[10px] font-mono">EMPTY SLOT</p>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex justify-center">
                  <motion.a
                    href="/inventory"
                    className="btn-outline flex items-center gap-2 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Package size={14} />
                    VIEW FULL INVENTORY
                    <ChevronRight size={14} />
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  )
}
