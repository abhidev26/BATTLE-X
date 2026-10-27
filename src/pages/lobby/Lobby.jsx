import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sword, Users, Shield, Crosshair, Target, Zap, Plus, DoorOpen,
  Search, Filter, Wifi, Clock, ChevronRight, MapPin, Map, Info,
  CheckCircle2, XCircle, Loader2,
} from 'lucide-react'
import { clsx } from 'clsx'
import { mockRooms, mockAdminStats } from '@/utils/mockData'
import { useNavigate } from 'react-router-dom'

// ─── Game Mode Data ────────────────────────────────────────────────────────────
const GAME_MODES = [
  { id: 'solo',     label: 'SOLO BATTLE',      desc: '1v19 – Last operator standing',  icon: Sword,      players: '1v19',  tag: 'RANKED'   },
  { id: 'duo',      label: 'DUO COMBAT',       desc: '2-player teams, outlast all',    icon: Users,      players: '2v18', tag: 'RANKED'   },
  { id: 'squad',    label: 'SQUAD WAR',        desc: '4-player squads, dominate zones',icon: Shield,     players: '4v16', tag: 'RANKED'   },
  { id: 'tdm',      label: 'TEAM DEATHMATCH',  desc: '10v10 kill-race, pure combat',   icon: Crosshair,  players: '10v10',tag: 'CASUAL'   },
  { id: 'practice', label: 'PRACTICE ZONE',    desc: 'Train freely, no rank impact',   icon: Target,     players: 'Solo', tag: 'TRAINING' },
]

// ─── Map Data ─────────────────────────────────────────────────────────────────
const MAPS = [
  {
    id: 'crimson',
    name: 'CRIMSON VALLEY',
    desc: 'A volcanic canyon scarred by warfare. Tight corridors funnel operators into brutal close-quarter skirmishes. High ground is everything.',
    modes: ['SOLO', 'DUO', 'SQUAD'],
    zones: 'North Ridge • Lava Flats • Steel Bridge • Bunker Alpha',
    size: 'MEDIUM',
    hazard: 'Lava zones active',
  },
  {
    id: 'iron',
    name: 'IRON FORTRESS',
    desc: 'An abandoned military complex with multi-level structures. Long sightlines reward snipers; the underground tunnels belong to shotgun operators.',
    modes: ['SOLO', 'TDM'],
    zones: 'Command Tower • East Barracks • Armory • Sewer Network',
    size: 'LARGE',
    hazard: 'None',
  },
  {
    id: 'shadow',
    name: 'SHADOW DESERT',
    desc: 'Open dunes meet ruined city outskirts. Sandstorms reduce visibility every 3 minutes. Fast movement and intel are your only advantages.',
    modes: ['DUO', 'SQUAD', 'PRACTICE'],
    zones: 'Dune Sea • Ruined Market • Outpost 7 • Oasis Camp',
    size: 'LARGE',
    hazard: 'Sandstorm cycles',
  },
]

// ─── Status Badge Component ────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    'WAITING':     { cls: 'badge-green', label: 'WAITING' },
    'STARTING':    { cls: 'badge-gold',  label: 'STARTING' },
    'IN PROGRESS': { cls: 'badge-gray',  label: 'IN PROGRESS' },
  }[status] ?? { cls: 'badge-gray', label: status }

  return <span className={cfg.cls}>{cfg.label}</span>
}

// ─── Ping Indicator ───────────────────────────────────────────────────────────
function PingBadge({ ping }) {
  const color = ping < 50 ? 'text-bz-green' : ping <= 100 ? 'text-bz-gold' : 'text-bz-red'
  return (
    <span className={clsx('font-mono text-xs font-semibold flex items-center gap-1', color)}>
      <Wifi size={11} />
      {ping}ms
    </span>
  )
}

// ─── Player Dots ──────────────────────────────────────────────────────────────
function PlayerDots({ current, max }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={clsx(
            'inline-block rounded-sm',
            max > 8 ? 'w-1.5 h-2' : 'w-2 h-2.5',
            i < current ? 'bg-bz-red' : 'bg-white/10'
          )}
        />
      ))}
    </div>
  )
}

// ─── Room Card ────────────────────────────────────────────────────────────────
function RoomCard({ room }) {
  const isDisabled = room.status === 'IN PROGRESS' || room.players >= room.maxPlayers
  const modeBadgeClass = {
    SOLO: 'badge-red', DUO: 'badge-cyan', SQUAD: 'badge-gold',
    'TEAM DEATHMATCH': 'badge-gray', PRACTICE: 'badge-green',
  }[room.mode] ?? 'badge-gray'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="card card-hover p-4 flex flex-col gap-3"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-display text-sm text-bz-white font-semibold tracking-wide">{room.name}</p>
          <p className="text-xs text-bz-gray mt-0.5 font-mono">{room.id.toUpperCase()}</p>
        </div>
        <StatusBadge status={room.status} />
      </div>

      {/* Mode + Map */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={modeBadgeClass}>{room.mode}</span>
        <span className="text-bz-gray text-xs flex items-center gap-1">
          <MapPin size={10} /> {room.map}
        </span>
      </div>

      {/* Players visual + ping */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-bz-gray text-[10px] uppercase tracking-widest">Operators</span>
          <PlayerDots current={room.players} max={Math.min(room.maxPlayers, 20)} />
          <span className="font-mono text-xs text-bz-white">{room.players}/{room.maxPlayers}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-bz-gray text-[10px] uppercase tracking-widest">Host</span>
          <span className="text-xs text-bz-white font-mono">{room.host}</span>
          <PingBadge ping={room.ping} />
        </div>
      </div>

      {/* Join button */}
      <button
        disabled={isDisabled}
        className={clsx(
          'w-full py-2 rounded text-xs font-display font-bold tracking-widest uppercase transition-all',
          isDisabled
            ? 'bg-white/5 text-bz-gray cursor-not-allowed border border-bz-border'
            : 'btn-primary text-white'
        )}
      >
        {isDisabled ? (room.status === 'IN PROGRESS' ? 'IN PROGRESS' : 'FULL') : 'JOIN'}
      </button>
    </motion.div>
  )
}

// ─── Map Preview Panel ────────────────────────────────────────────────────────
function MapPreview({ map }) {
  return (
    <div className="hud-panel p-5 flex flex-col gap-4 h-full">
      {/* Grid art placeholder */}
      <div className="relative h-40 rounded border border-bz-border overflow-hidden bg-bz-black bg-grid-sm flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bz-surface/90" />
        <p className="font-display text-bz-red text-xl font-black tracking-widest z-10 text-gradient-red">
          {map.name}
        </p>
        <div className="absolute top-2 right-2 badge-red text-[10px]">{map.size}</div>
      </div>

      {/* Desc */}
      <p className="text-bz-gray text-xs leading-relaxed">{map.desc}</p>

      {/* Zones */}
      <div>
        <p className="text-[10px] text-bz-red uppercase tracking-widest mb-1.5 font-display">Zone Layout</p>
        <div className="flex flex-wrap gap-1.5">
          {map.zones.split(' • ').map(z => (
            <span key={z} className="badge-gray text-[10px]">{z}</span>
          ))}
        </div>
      </div>

      {/* Recommended modes */}
      <div>
        <p className="text-[10px] text-bz-red uppercase tracking-widest mb-1.5 font-display">Recommended Modes</p>
        <div className="flex flex-wrap gap-1.5">
          {map.modes.map(m => (
            <span key={m} className="badge-red text-[10px]">{m}</span>
          ))}
        </div>
      </div>

      {/* Hazard */}
      {map.hazard !== 'None' && (
        <div className="flex items-center gap-2 bg-bz-red/10 border border-bz-red/30 rounded px-3 py-2">
          <Info size={12} className="text-bz-red flex-shrink-0" />
          <span className="text-bz-red text-xs font-mono">{map.hazard}</span>
        </div>
      )}
    </div>
  )
}

// ─── Main Lobby Component ──────────────────────────────────────────────────────
export default function Lobby() {
  const navigate = useNavigate()
  const [selectedMode, setSelectedMode] = useState('solo')
  const [selectedMap, setSelectedMap] = useState('crimson')
  const [search, setSearch] = useState('')
  const [filterMode, setFilterMode] = useState('ALL')

  const currentMap = MAPS.find(m => m.id === selectedMap)

  const filteredRooms = useMemo(() => {
    return mockRooms.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
                          r.host.toLowerCase().includes(search.toLowerCase())
      const matchMode = filterMode === 'ALL' || r.mode === filterMode
      return matchSearch && matchMode
    })
  }, [search, filterMode])

  const handleQuickMatch = () => navigate('/lobby/matchmaking')

  return (
    <div className="min-h-screen bg-bz-black text-bz-white">
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-8">

        {/* ── Page Header ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="w-12 h-0.5 bg-bz-red mb-3" />
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-widest text-gradient-red uppercase">
              Battlezone Lobby
            </h1>
            <p className="text-bz-gray text-sm mt-1 font-mono">Choose your mode and deploy</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="online-dot" />
              <div>
                <p className="text-[10px] text-bz-gray uppercase tracking-widest">Operators Online</p>
                <p className="font-mono font-bold text-bz-green text-sm">
                  {mockAdminStats.onlinePlayers.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="w-px h-8 bg-bz-border" />
            <div>
              <p className="text-[10px] text-bz-gray uppercase tracking-widest">Active Matches</p>
              <p className="font-mono font-bold text-bz-white text-sm">
                {mockAdminStats.activeMatches.toLocaleString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Game Mode Selection ─────────────────────────────────────────── */}
        <section>
          <p className="text-[10px] text-bz-gray uppercase tracking-widest mb-3 font-display">Select Mode</p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {GAME_MODES.map((mode, idx) => {
              const Icon = mode.icon
              const isSelected = selectedMode === mode.id
              return (
                <motion.button
                  key={mode.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedMode(mode.id)}
                  className={clsx(
                    'flex-shrink-0 w-44 md:flex-1 min-w-[160px] p-4 rounded border text-left transition-all duration-200',
                    isSelected
                      ? 'border-bz-red bg-bz-red/10 shadow-red-glow-sm'
                      : 'border-bz-border bg-bz-surface hover:border-bz-red/40 hover:bg-bz-surface2'
                  )}
                >
                  <div className={clsx('mb-2', isSelected ? 'text-bz-red' : 'text-bz-gray')}>
                    <Icon size={20} />
                  </div>
                  <p className={clsx('font-display text-xs font-bold tracking-wider',
                    isSelected ? 'text-bz-red' : 'text-bz-white')}>{mode.label}</p>
                  <p className="text-bz-gray text-[10px] mt-1 leading-relaxed">{mode.desc}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-bz-gray">{mode.players}</span>
                    <span className={clsx('text-[10px] font-display',
                      mode.tag === 'RANKED' ? 'text-bz-gold' : mode.tag === 'TRAINING' ? 'text-bz-green' : 'text-bz-gray'
                    )}>{mode.tag}</span>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </section>

        {/* ── Quick Actions ───────────────────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickMatch}
            className="btn-primary flex-1 py-4 text-sm font-display tracking-widest flex items-center justify-center gap-2 shadow-red-glow animate-pulse-red"
          >
            <Zap size={18} className="animate-float" />
            QUICK MATCH
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex-1 py-4 text-sm font-display tracking-widest flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            CREATE ROOM
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-outline flex-1 py-4 text-sm font-display tracking-widest flex items-center justify-center gap-2"
          >
            <DoorOpen size={18} />
            JOIN ROOM
          </motion.button>
        </section>
        <div className="flex justify-center -mt-4">
          <button className="btn-ghost text-xs font-display tracking-widest flex items-center gap-1 text-bz-gray hover:text-bz-white">
            <Target size={13} />
            PRACTICE MODE
          </button>
        </div>

        {/* ── Available Rooms + Map Preview ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Rooms section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] text-bz-gray uppercase tracking-widest font-display">
                Available Rooms ({filteredRooms.length})
              </p>
            </div>

            {/* Search + filter */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-bz-gray" />
                <input
                  className="input w-full pl-9 text-sm"
                  placeholder="Search rooms or hosts..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="input text-sm pr-8"
                value={filterMode}
                onChange={e => setFilterMode(e.target.value)}
              >
                <option value="ALL">ALL MODES</option>
                <option value="SOLO">SOLO</option>
                <option value="DUO">DUO</option>
                <option value="SQUAD">SQUAD</option>
                <option value="TEAM DEATHMATCH">TDM</option>
              </select>
            </div>

            {/* Room grid */}
            <AnimatePresence mode="popLayout">
              {filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredRooms.map(room => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card text-center py-16 col-span-2"
                >
                  <DoorOpen size={36} className="text-bz-gray mx-auto mb-3" />
                  <p className="font-display text-bz-gray text-sm tracking-widest">NO ROOMS FOUND</p>
                  <p className="text-bz-gray text-xs mt-1">Try adjusting your filters or create a new room</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Map Preview */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-bz-gray uppercase tracking-widest font-display">Map Preview</p>
            </div>
            {/* Map selector tabs */}
            <div className="flex rounded overflow-hidden border border-bz-border">
              {MAPS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMap(m.id)}
                  className={clsx(
                    'flex-1 py-2 text-[10px] font-display tracking-wider uppercase transition-all',
                    selectedMap === m.id
                      ? 'bg-bz-red text-white'
                      : 'bg-bz-surface text-bz-gray hover:bg-bz-surface2 hover:text-bz-white'
                  )}
                >
                  {m.id === 'crimson' ? 'CV' : m.id === 'iron' ? 'IF' : 'SD'}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMap}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <MapPreview map={currentMap} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
