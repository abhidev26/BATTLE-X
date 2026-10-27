import { motion } from 'framer-motion'
import {
  Users, Wifi, Gamepad2, BarChart2, Flag, DollarSign,
  UserPlus, AlertTriangle, Trophy, Zap, Activity,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { mockAdminStats } from '@/utils/mockData'
import { clsx } from 'clsx'

// ── helpers ──────────────────────────────────────────────────────────
const fmt = n => n.toLocaleString()

const dap = mockAdminStats.dailyActivePlayers.labels.map((day, i) => ({
  day,
  players: mockAdminStats.dailyActivePlayers.data[i],
}))
const mpd = mockAdminStats.matchesPerDay.labels.map((day, i) => ({
  day,
  matches: mockAdminStats.matchesPerDay.data[i],
}))
const reg = mockAdminStats.newRegistrations.labels.map((day, i) => ({
  day,
  registrations: mockAdminStats.newRegistrations.data[i],
}))
const pieData = mockAdminStats.gameModes.labels.map((name, i) => ({
  name,
  value: mockAdminStats.gameModes.data[i],
}))
const PIE_COLORS = ['#ff1a1a', '#ffd700', '#06b6d4', '#8b5cf6', '#22c55e']

const STAT_CARDS = [
  { label: 'TOTAL PLAYERS', value: fmt(mockAdminStats.totalPlayers), icon: Users, color: 'text-bz-white', pulse: false },
  { label: 'ONLINE NOW', value: fmt(mockAdminStats.onlinePlayers), icon: Wifi, color: 'text-bz-green', pulse: true },
  { label: 'ACTIVE MATCHES', value: fmt(mockAdminStats.activeMatches), icon: Gamepad2, color: 'text-bz-white', pulse: false },
  { label: 'MATCHES TODAY', value: fmt(mockAdminStats.matchesToday), icon: BarChart2, color: 'text-bz-white', pulse: false },
  { label: 'OPEN REPORTS', value: mockAdminStats.reports, icon: Flag, color: 'text-bz-red', pulse: true },
  { label: 'REVENUE', value: `$${fmt(mockAdminStats.revenue)}`, icon: DollarSign, color: 'text-bz-gold', pulse: false },
]

const ACTIVITY_FEED = [
  { icon: UserPlus,     type: 'JOIN',        msg: 'VENOM_SHADOW connected',             time: '2m ago',  color: 'text-bz-green' },
  { icon: Gamepad2,     type: 'MATCH',       msg: 'SOLO match #8924 started',           time: '5m ago',  color: 'text-bz-white' },
  { icon: Flag,         type: 'REPORT',      msg: 'Player TOXIC_USER reported',         time: '12m ago', color: 'text-bz-red' },
  { icon: Trophy,       type: 'ACHIEVEMENT', msg: 'NIGHTMARE_X unlocked ZONE MASTER',   time: '18m ago', color: 'text-bz-gold' },
  { icon: AlertTriangle,type: 'WARN',        msg: 'Server CPU spike detected (78%)',    time: '24m ago', color: 'text-bz-red' },
  { icon: Users,        type: 'JOIN',        msg: 'IRON_WOLF connected from new device', time: '31m ago', color: 'text-bz-green' },
  { icon: Zap,          type: 'SYSTEM',      msg: 'Anti-cheat triggered: SHADOW_99',    time: '45m ago', color: 'text-bz-red' },
  { icon: Activity,     type: 'SYSTEM',      msg: 'Daily stats snapshot saved',         time: '1h ago',  color: 'text-bz-gray' },
]

// ── custom tooltip ────────────────────────────────────────────────────
const BzTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="hud-panel text-xs p-2 space-y-1 min-w-[110px]">
      <p className="font-display text-[10px] text-bz-gray tracking-widest">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="font-mono" style={{ color: p.color || p.fill || '#ff1a1a' }}>
          {p.name}: <span className="text-bz-white">{p.value?.toLocaleString()}</span>
        </p>
      ))}
    </div>
  )
}

// ── Section header ────────────────────────────────────────────────────
const SectionHead = ({ title }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1 h-5 bg-bz-red rounded" />
    <h2 className="font-display text-xs tracking-widest text-bz-white">{title}</h2>
  </div>
)

const fadeUp = i => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: i * 0.06 },
})

export default function AdminOverview() {
  return (
    <div className="p-6 space-y-8 max-w-[1400px] mx-auto">
      {/* Page title */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="font-display text-xl font-bold text-bz-white tracking-widest">OVERVIEW</h1>
          <p className="text-muted text-xs mt-0.5">Real-time platform statistics & system health</p>
        </div>
        <div className="ml-auto flex items-center gap-2 font-mono text-xs text-bz-green">
          <span className="online-dot" />
          <span>SYSTEMS NOMINAL</span>
        </div>
      </div>

      {/* ── Stat cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {STAT_CARDS.map(({ label, value, icon: Icon, color, pulse }, i) => (
          <motion.div key={label} {...fadeUp(i)} className="card card-hover p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-[9px] tracking-widest text-bz-gray">{label}</span>
              <Icon size={14} className={color} />
            </div>
            <div className="flex items-center gap-2">
              {pulse && <span className={clsx('w-2 h-2 rounded-full shrink-0', color === 'text-bz-green' ? 'online-dot' : 'offline-dot')} />}
              <span className={clsx('font-mono text-xl font-bold', color)}>{value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Charts row 1 ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Active Players */}
        <motion.div {...fadeUp(6)} className="card p-5">
          <SectionHead title="DAILY ACTIVE PLAYERS (7-DAY)" />
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={dap}>
              <defs>
                <linearGradient id="redGradDAP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#ff1a1a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
              <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<BzTooltip />} />
              <Area type="monotone" dataKey="players" name="Players" stroke="#ff1a1a" strokeWidth={2} fill="url(#redGradDAP)" dot={{ r: 3, fill: '#ff1a1a' }} activeDot={{ r: 5, fill: '#ff1a1a' }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Matches Per Day */}
        <motion.div {...fadeUp(7)} className="card p-5">
          <SectionHead title="MATCHES PER DAY (7-DAY)" />
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mpd} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={50} />
              <Tooltip content={<BzTooltip />} />
              <Bar dataKey="matches" name="Matches" fill="#ff1a1a" radius={[3, 3, 0, 0]}>
                {mpd.map((_, i) => (
                  <Cell key={i} fill={i === mpd.length - 1 ? '#ff4444' : '#ff1a1a'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* ── Charts row 2 ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New Registrations */}
        <motion.div {...fadeUp(8)} className="card p-5">
          <SectionHead title="NEW REGISTRATIONS (7-DAY)" />
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={reg}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" />
              <XAxis dataKey="day" tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#888', fontSize: 10, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<BzTooltip />} />
              <Line type="monotone" dataKey="registrations" name="Registrations" stroke="#ff1a1a" strokeWidth={2} dot={{ r: 3, fill: '#ff1a1a', strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Game Mode Distribution */}
        <motion.div {...fadeUp(9)} className="card p-5">
          <SectionHead title="GAME MODE DISTRIBUTION" />
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<BzTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                  <span className="text-bz-gray font-display text-[10px] tracking-wider flex-1">{item.name.toUpperCase()}</span>
                  <span className="font-mono text-bz-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── System events feed ──────────────────────────────────────── */}
      <motion.div {...fadeUp(10)} className="card p-5">
        <SectionHead title="SYSTEM EVENTS" />
        <div className="divide-y divide-bz-border/50">
          {ACTIVITY_FEED.map(({ icon: Icon, type, msg, time, color }, i) => (
            <div
              key={i}
              className={clsx(
                'flex items-center gap-4 py-3 px-2 rounded transition-colors',
                i % 2 === 0 ? 'bg-white/[0.01]' : ''
              )}
            >
              <div className={clsx('w-7 h-7 rounded flex items-center justify-center bg-bz-surface2 shrink-0', color)}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs text-bz-white truncate">{msg}</span>
              </div>
              <span className="badge-gray text-[9px] shrink-0">{type}</span>
              <span className="font-mono text-[11px] text-bz-gray shrink-0">{time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
