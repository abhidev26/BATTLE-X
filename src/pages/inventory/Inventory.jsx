import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coins, Package, SlidersHorizontal, Check, ChevronDown,
  Sword, Shield, Zap, Star, Search, Eye
} from 'lucide-react'
import { clsx } from 'clsx'
import { mockWeapons, mockInventoryItems, mockPlayer } from '@/utils/mockData'

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['ALL', 'WEAPONS', 'SKINS', 'CHARACTERS', 'EMOTES', 'BANNERS', 'BADGES', 'CONSUMABLES']
const SORT_OPTIONS = ['BY NAME', 'BY RARITY', 'BY RECENTLY ACQUIRED']
const RARITIES = ['LEGENDARY', 'EPIC', 'RARE', 'COMMON']

const RARITY_ORDER = { LEGENDARY: 0, EPIC: 1, RARE: 2, COMMON: 3 }
const RARITY_COLORS = {
  LEGENDARY: 'text-bz-gold border-bz-gold/40 bg-bz-gold/10',
  EPIC: 'text-purple-400 border-purple-400/40 bg-purple-400/10',
  RARE: 'text-blue-400 border-blue-400/40 bg-blue-400/10',
  COMMON: 'text-bz-gray border-bz-gray/40 bg-bz-gray/10',
}

const CATEGORY_ICONS = {
  SKINS: '🎨', CHARACTERS: '🧑‍🚀', EMOTES: '💃', BANNERS: '🚩', BADGES: '🏅', CONSUMABLES: '🧪', WEAPONS: '🔫',
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RarityBadge({ rarity }) {
  return (
    <span className={clsx('px-2 py-0.5 rounded border text-[10px] font-mono font-bold uppercase', RARITY_COLORS[rarity] || 'badge-gray')}>
      {rarity}
    </span>
  )
}

function StatBar({ label, value, max = 100, color = '#ff1a1a' }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="flex items-center gap-2">
      <span className="text-bz-gray text-[9px] font-mono w-14 uppercase shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-bz-surface2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <span className="text-bz-gray text-[9px] font-mono w-6 text-right">{value}</span>
    </div>
  )
}

function WeaponCard({ weapon, onEquip }) {
  const [hovered, setHovered] = useState(false)

  const rarityBorderMap = {
    LEGENDARY: 'border-bz-gold/40 hover:border-bz-gold/70 hover:shadow-[0_0_14px_rgba(255,215,0,0.15)]',
    EPIC: 'border-purple-400/30 hover:border-purple-400/60',
    RARE: 'border-blue-400/30 hover:border-blue-400/60',
    COMMON: 'border-bz-border hover:border-bz-border',
  }

  return (
    <motion.div
      className={clsx(
        'card relative overflow-hidden p-4 transition-all duration-300 cursor-pointer',
        rarityBorderMap[weapon.rarity]
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02, y: -3 }}
      layout
    >
      {/* Rarity accent top */}
      <div className={clsx(
        'absolute top-0 left-0 right-0 h-0.5',
        weapon.rarity === 'LEGENDARY' ? 'bg-bz-gold' :
          weapon.rarity === 'EPIC' ? 'bg-purple-400' :
            weapon.rarity === 'RARE' ? 'bg-blue-400' : 'bg-bz-gray/40'
      )} />

      {/* Top badges */}
      <div className="flex items-start justify-between mb-3">
        <span className="badge-gray text-[9px]">{weapon.category}</span>
        <RarityBadge rarity={weapon.rarity} />
      </div>

      {/* Icon placeholder */}
      <div className="flex justify-center mb-3">
        <div className="text-5xl select-none">🔫</div>
      </div>

      {/* Name */}
      <h3 className="font-display text-sm font-bold text-bz-white text-center mb-2">{weapon.name}</h3>

      {/* Key stats row */}
      <div className="flex justify-between text-[10px] font-mono text-bz-gray mb-3">
        <span>DMG <span className="text-bz-white font-bold">{weapon.damage}</span></span>
        <span>RPM <span className="text-bz-white font-bold">{weapon.fireRate}</span></span>
        <span>MAG <span className="text-bz-white font-bold">{weapon.magazine || '—'}</span></span>
      </div>

      {/* Animated stat bars */}
      <AnimatePresence>
        {(hovered || true) && (
          <motion.div
            className="space-y-1.5 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <StatBar label="DAMAGE" value={weapon.damage} max={200} color="#ff1a1a" />
            <StatBar label="RANGE" value={weapon.range} max={100} color="#60a5fa" />
            <StatBar label="ACCURACY" value={weapon.accuracy} max={100} color="#4ade80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Kills */}
      <p className="text-bz-gray text-[10px] font-mono text-center mb-3">
        KILLS: <span className="text-bz-red font-bold">{weapon.kills.toLocaleString()}</span>
      </p>

      {/* Equip button */}
      {weapon.owned ? (
        <motion.button
          onClick={() => onEquip(weapon.id)}
          className={clsx(
            'w-full py-1.5 rounded text-[11px] font-mono font-bold uppercase transition-all',
            weapon.equipped
              ? 'bg-bz-green/20 text-bz-green border border-bz-green/40 cursor-default'
              : 'btn-primary'
          )}
          whileTap={{ scale: weapon.equipped ? 1 : 0.97 }}
        >
          {weapon.equipped ? '✓ EQUIPPED' : 'EQUIP'}
        </motion.button>
      ) : (
        <button className="w-full py-1.5 rounded text-[11px] font-mono font-bold uppercase text-bz-gray border border-bz-border cursor-not-allowed">
          LOCKED
        </button>
      )}
    </motion.div>
  )
}

function ItemCard({ item, onEquip }) {
  return (
    <motion.div
      className="card p-4 flex flex-col gap-3 hover:border-bz-red/30 transition-all duration-300"
      whileHover={{ scale: 1.02, y: -3 }}
      layout
    >
      {/* Icon area */}
      <div className="flex items-center justify-center h-20 rounded-lg bg-bz-surface2 border border-bz-border text-5xl">
        {CATEGORY_ICONS[item.category] || '📦'}
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display text-xs font-bold text-bz-white leading-tight">{item.name}</h3>
          <p className="text-bz-gray text-[10px] font-mono uppercase">{item.category}</p>
        </div>
        <RarityBadge rarity={item.rarity} />
      </div>

      {item.equipped && (
        <span className="self-start badge-green text-[9px]">EQUIPPED</span>
      )}

      <div className="flex gap-2 mt-auto">
        <motion.button
          onClick={() => onEquip(item.id)}
          className={clsx(
            'flex-1 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all',
            item.equipped
              ? 'bg-bz-green/20 text-bz-green border border-bz-green/40 cursor-default'
              : 'btn-primary'
          )}
          whileTap={{ scale: item.equipped ? 1 : 0.97 }}
        >
          {item.equipped ? '✓ EQUIPPED' : 'EQUIP'}
        </motion.button>
        <motion.button
          className="btn-ghost px-2 py-1.5 text-[10px]"
          whileTap={{ scale: 0.97 }}
          title="Inspect"
        >
          <Eye size={12} />
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Inventory() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [sortBy, setSortBy] = useState('BY RARITY')
  const [rarityFilters, setRarityFilters] = useState([])
  const [weapons, setWeapons] = useState(mockWeapons)
  const [items, setItems] = useState(mockInventoryItems)
  const [showSort, setShowSort] = useState(false)

  const totalItems = weapons.filter(w => w.owned).length + items.length

  // Loadout slots
  const primary = weapons.find(w => w.equipped && w.category !== 'MELEE' && w.category !== 'PISTOL')
  const secondary = weapons.find(w => w.equipped && (w.category === 'PISTOL'))
  const melee = weapons.find(w => w.category === 'MELEE' && w.owned)

  const handleEquipWeapon = (id) => {
    setWeapons(prev => prev.map(w => ({
      ...w,
      equipped: w.id === id ? !w.equipped : (w.id !== id && w.category === prev.find(x => x.id === id)?.category ? false : w.equipped)
    })))
  }

  const handleEquipItem = (id) => {
    setItems(prev => {
      const target = prev.find(i => i.id === id)
      return prev.map(i => ({
        ...i,
        equipped: i.category === target.category
          ? i.id === id ? !i.equipped : false
          : i.equipped
      }))
    })
  }

  const toggleRarity = (r) => {
    setRarityFilters(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  const filteredWeapons = useMemo(() => {
    let ws = weapons.filter(w => w.owned)
    if (rarityFilters.length) ws = ws.filter(w => rarityFilters.includes(w.rarity))
    if (sortBy === 'BY NAME') ws = [...ws].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'BY RARITY') ws = [...ws].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    return ws
  }, [weapons, rarityFilters, sortBy])

  const filteredItems = useMemo(() => {
    let its = items
    if (activeCategory !== 'ALL' && activeCategory !== 'WEAPONS') {
      its = its.filter(i => i.category === activeCategory)
    }
    if (activeCategory === 'WEAPONS') return []
    if (rarityFilters.length) its = its.filter(i => rarityFilters.includes(i.rarity))
    if (sortBy === 'BY NAME') its = [...its].sort((a, b) => a.name.localeCompare(b.name))
    if (sortBy === 'BY RARITY') its = [...its].sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity])
    return its
  }, [items, activeCategory, rarityFilters, sortBy])

  const showWeapons = activeCategory === 'ALL' || activeCategory === 'WEAPONS'

  return (
    <div className="min-h-screen bg-bz-black text-bz-white pb-20">
      {/* ── Header ── */}
      <div className="relative bg-bz-surface border-b border-bz-border overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-bz-red to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-gradient-red tracking-wider">
              ARMORY & INVENTORY
            </h1>
            <p className="text-bz-gray text-xs font-mono mt-1 uppercase tracking-widest">
              {totalItems} ITEMS IN COLLECTION
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-bz-gold/30 bg-bz-gold/10">
              <Coins size={14} className="text-bz-gold" />
              <span className="font-mono text-sm font-bold text-bz-gold">{mockPlayer.coins.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-bz-border bg-bz-surface2">
              <Package size={14} className="text-bz-gray" />
              <span className="font-mono text-sm font-bold text-bz-white">{totalItems} ITEMS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* ── Category Tabs ── */}
        <div className="flex gap-1 overflow-x-auto pb-1 border-b border-bz-border">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={clsx(
                'px-4 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap relative transition-all',
                activeCategory === cat ? 'text-bz-red' : 'text-bz-gray hover:text-bz-white'
              )}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="invTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-bz-red"
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Sort & Filter Bar ── */}
        <div className="flex flex-wrap items-center gap-4 py-3 px-4 rounded-lg border border-bz-border bg-bz-surface2">
          <div className="flex items-center gap-2 text-bz-gray text-xs font-mono">
            <SlidersHorizontal size={12} />
            SORT:
          </div>
          <div className="flex gap-2 flex-wrap">
            {SORT_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={clsx(
                  'px-3 py-1 rounded text-[10px] font-mono font-bold uppercase border transition-all',
                  sortBy === s
                    ? 'border-bz-red/50 bg-bz-red/10 text-bz-red'
                    : 'border-bz-border text-bz-gray hover:border-bz-gray/50 hover:text-bz-white'
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="h-4 w-px bg-bz-border hidden sm:block" />
          <div className="flex items-center gap-2 text-bz-gray text-xs font-mono">RARITY:</div>
          <div className="flex gap-2 flex-wrap">
            {RARITIES.map(r => (
              <button
                key={r}
                onClick={() => toggleRarity(r)}
                className={clsx(
                  'flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono font-bold uppercase transition-all',
                  rarityFilters.includes(r)
                    ? RARITY_COLORS[r]
                    : 'border-bz-border text-bz-gray hover:text-bz-white hover:border-bz-gray/50'
                )}
              >
                {rarityFilters.includes(r) && <Check size={9} />}
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* ── Weapons Section ── */}
        <AnimatePresence>
          {showWeapons && (
            <motion.section
              key="weapons-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Loadout slots */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-1 h-4 bg-bz-red rounded-full" />
                  <h2 className="text-xs font-mono font-bold text-bz-gray uppercase tracking-widest">ACTIVE LOADOUT</h2>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {[
                    { label: 'PRIMARY', weapon: primary, icon: '🔫' },
                    { label: 'SECONDARY', weapon: secondary, icon: '🔧' },
                    { label: 'MELEE', weapon: melee, icon: '🗡️' },
                  ].map(slot => (
                    <div
                      key={slot.label}
                      className={clsx(
                        'shrink-0 w-48 rounded-lg border p-3 flex items-center gap-3',
                        slot.weapon
                          ? 'border-bz-red/30 bg-bz-surface2'
                          : 'border-dashed border-bz-border bg-transparent'
                      )}
                    >
                      <div className="text-2xl">{slot.weapon ? '🔫' : '➕'}</div>
                      <div>
                        <p className="text-[9px] font-mono text-bz-gray uppercase">{slot.label}</p>
                        <p className="text-xs font-display font-bold text-bz-white">
                          {slot.weapon ? slot.weapon.name : 'EMPTY'}
                        </p>
                        {slot.weapon && <RarityBadge rarity={slot.weapon.rarity} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weapons grid */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-4 bg-bz-red rounded-full" />
                <h2 className="text-xs font-mono font-bold text-bz-gray uppercase tracking-widest">
                  WEAPONS ({filteredWeapons.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredWeapons.map((w, idx) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                  >
                    <WeaponCard weapon={w} onEquip={handleEquipWeapon} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Items Grid ── */}
        <AnimatePresence>
          {filteredItems.length > 0 && (
            <motion.section
              key="items-section"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-4 bg-bz-red rounded-full" />
                <h2 className="text-xs font-mono font-bold text-bz-gray uppercase tracking-widest">
                  {activeCategory === 'ALL' ? 'ALL ITEMS' : activeCategory} ({filteredItems.length})
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <ItemCard item={item} onEquip={handleEquipItem} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
