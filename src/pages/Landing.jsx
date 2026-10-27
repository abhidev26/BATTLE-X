import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Crosshair, Map, Users, Sword, Trophy, Package,
  BarChart2, Shield, Zap, Target, Star, Lock,
  Menu, X, ChevronDown, ArrowRight, Play,
  Cpu, Globe, Layers, Award, TrendingUp, Radio,
  Twitter, Youtube, MessageCircle, Instagram,
  ChevronRight, Flame, Crown, Skull, Clock,
} from 'lucide-react'
import { clsx } from 'clsx'
import {
  mockLeaderboard,
  mockWeapons,
  mockAchievements,
  mockAdminStats,
} from '@/utils/mockData'

// ─── Particle Dot ────────────────────────────────────────────────────────────
function Particle({ delay = 0, x, y, size = 4 }) {
  return (
    <motion.div
      className="absolute rounded-full bg-bz-red opacity-0 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0.5, 1.4, 0.5],
        y: [0, -30, -60],
      }}
      transition={{
        duration: 4 + Math.random() * 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

// ─── HUD Corner Brackets ─────────────────────────────────────────────────────
function HudCorners({ className = '' }) {
  const corner = 'w-5 h-5 border-bz-red'
  return (
    <div className={clsx('absolute inset-0 pointer-events-none', className)}>
      <span className={clsx(corner, 'absolute top-0 left-0 border-t-2 border-l-2')} />
      <span className={clsx(corner, 'absolute top-0 right-0 border-t-2 border-r-2')} />
      <span className={clsx(corner, 'absolute bottom-0 left-0 border-b-2 border-l-2')} />
      <span className={clsx(corner, 'absolute bottom-0 right-0 border-b-2 border-r-2')} />
    </div>
  )
}

// ─── Section Wrapper with useInView ──────────────────────────────────────────
function Section({ id, children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ label, title, sub }) {
  return (
    <div className="text-center mb-12">
      {label && (
        <span className="inline-block text-bz-red font-mono text-xs tracking-widest uppercase mb-3 border border-bz-red/30 px-3 py-1 rounded-sm">
          {label}
        </span>
      )}
      <h2 className="heading-section text-gradient-red">{title}</h2>
      {sub && <p className="text-muted mt-3 max-w-xl mx-auto">{sub}</p>}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-16 bg-bz-red/40" />
        <span className="w-2 h-2 rotate-45 bg-bz-red" />
        <span className="h-px w-16 bg-bz-red/40" />
      </div>
    </div>
  )
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const raw = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    let start = 0
    const duration = 2000
    const step = 16
    const increment = raw / (duration / step)
    const timer = setInterval(() => {
      start += increment
      if (start >= raw) {
        setCount(raw)
        clearInterval(timer)
      } else {
        setCount(parseFloat(start.toFixed(1)))
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, target])

  const formatted = Number.isInteger(parseFloat(String(target).replace(/[^0-9.]/g, '')))
    ? Math.round(count).toLocaleString()
    : count.toLocaleString()

  return (
    <span ref={ref} className="font-mono tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  )
}

// ─── Rarity colour helper ─────────────────────────────────────────────────────
function rarityClass(rarity) {
  const map = {
    LEGENDARY: 'badge-gold',
    EPIC: 'text-purple-400 border border-purple-400/40 bg-purple-400/10 px-2 py-0.5 rounded-sm font-mono text-xs',
    RARE: 'badge-cyan',
    COMMON: 'badge-gray',
  }
  return map[rarity] || 'badge-gray'
}

// ─── Stat Bar ──────────────────────────────────────────────────────────────────
function StatBar({ label, value, max = 100, color = 'bg-bz-red' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-bz-gray">{label}</span>
        <span className="text-bz-white">{value}</span>
      </div>
      <div className="stat-bar">
        <motion.div
          className={clsx('stat-bar-fill', color)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
        />
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function Landing() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll listener for glassmorphic nav
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'GAME', href: '#game-intro' },
    { label: 'MODES', href: '#modes' },
    { label: 'LEADERBOARD', href: '#leaderboard' },
    { label: 'COMMUNITY', href: '#community' },
  ]

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // Particle positions (deterministic)
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: (i * 37 + 11) % 97,
    y: (i * 53 + 7) % 95,
    delay: (i * 0.4) % 5,
    size: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
  }))

  // ── Top 5 leaderboard entries
  const top5 = mockLeaderboard.slice(0, 5)

  // ── First 6 achievements
  const featuredAchievements = mockAchievements.slice(0, 6)

  // ── First 4 weapons
  const featuredWeapons = mockWeapons.slice(0, 4)

  return (
    <div className="min-h-screen bg-bz-black text-bz-white overflow-x-hidden">

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 1. NAVIGATION                                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bz-black/80 backdrop-blur-md border-b border-bz-border shadow-card'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('#hero')}>
              <div className="relative clip-hex bg-bz-red w-9 h-9 flex items-center justify-center shadow-red-glow-sm flex-shrink-0">
                <span className="font-display font-black text-white text-sm leading-none">BX</span>
              </div>
              <span className="font-display font-black text-bz-white tracking-widest text-base hidden sm:block">
                BATTLEZONE <span className="text-bz-red">X</span>
              </span>
            </div>

            {/* Center nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="nav-item font-display text-xs tracking-widest"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button className="btn-outline text-xs px-4 py-2" onClick={() => navigate('/login')}>
                LOGIN
              </button>
              <button className="btn-primary text-xs px-4 py-2" onClick={() => navigate('/register')}>
                PLAY NOW
              </button>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden text-bz-white p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-bz-surface border-b border-bz-border overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="block w-full text-left nav-item font-display text-xs tracking-widest py-3"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="flex gap-3 pt-4 border-t border-bz-border">
                  <button className="btn-outline text-xs flex-1 py-2" onClick={() => navigate('/login')}>LOGIN</button>
                  <button className="btn-primary text-xs flex-1 py-2" onClick={() => navigate('/register')}>PLAY NOW</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 2. HERO                                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-grid"
      >
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-bz-black/60 to-bz-black pointer-events-none" />

        {/* Red bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-bz-black to-transparent pointer-events-none" />

        {/* Floating particles */}
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay} size={p.size} />
        ))}

        {/* Decorative red horizontal lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-bz-red/10" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-bz-red/10" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-5xl mx-auto">
          <div className="relative inline-block p-8 sm:p-12">
            <HudCorners />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="badge-red font-display text-xs tracking-widest animate-pulse-red">
                ⚡ SEASON 4 — NOW LIVE
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="heading-display text-gradient-red glow-red mb-4 leading-none"
            >
              BATTLEZONE
              <br />
              <span className="text-bz-white">X</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="font-display text-bz-gray text-base sm:text-lg tracking-[0.3em] uppercase mb-10"
            >
              ENTER THE ZONE.{' '}
              <span className="text-bz-red">SURVIVE.</span>{' '}
              DOMINATE.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
            >
              <button
                className="btn-primary px-8 py-3 text-sm flex items-center gap-2 shadow-red-glow"
                onClick={() => navigate('/register')}
              >
                <Play size={16} fill="currentColor" />
                PLAY NOW
              </button>
              <button
                className="btn-outline px-8 py-3 text-sm flex items-center gap-2"
                onClick={() => scrollTo('#game-intro')}
              >
                EXPLORE GAME
                <ArrowRight size={16} />
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
            >
              {[
                { value: '10,000+', label: 'PLAYERS' },
                { value: '500+', label: 'DAILY MATCHES' },
                { value: '50+', label: 'COUNTRIES' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="font-mono font-bold text-bz-red text-xl sm:text-2xl">{value}</div>
                  <div className="font-display text-bz-gray text-xs tracking-widest">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-bz-gray"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <ChevronDown size={18} className="text-bz-red" />
        </motion.div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 3. GAME INTRODUCTION                                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="game-intro" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <SectionHeader label="OVERVIEW" title="WHAT IS BATTLEZONE X?" />
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left: Text */}
          <div className="space-y-5 text-bz-gray leading-relaxed">
            <p>
              <span className="text-bz-white font-semibold">BATTLEZONE X</span> is the next generation of
              browser-based tactical combat — a premium esports platform that puts elite gameplay directly
              at your fingertips. No downloads, no barriers. Just raw, skill-driven competition.
            </p>
            <p>
              Compete in real-time across dynamic battle zones with up to 20 players. Master complex terrain,
              adapt your loadout, and outthink opponents in a game where every decision matters.
              Whether you run solo or coordinate with a tight squad, BATTLEZONE X rewards strategy over luck.
            </p>
            <p>
              Built for competitive players who demand more — a persistent rank system, live leaderboards,
              global tournaments, and a thriving community of operators who play to win. Step in.
              The zone doesn't wait.
            </p>
          </div>

          {/* Right: Feature cards */}
          <div className="space-y-4">
            {[
              {
                icon: Crosshair,
                title: 'TACTICAL COMBAT',
                desc: 'Precision mechanics and real-time physics create firefights that demand skill, positioning, and split-second decisions.',
              },
              {
                icon: Map,
                title: 'STRATEGIC ZONES',
                desc: 'Dynamic combat zones with evolving shrinking boundaries, environmental hazards, and position advantages to exploit.',
              },
              {
                icon: Users,
                title: 'TEAM COORDINATION',
                desc: 'From solo runs to 4-man squads — in-game communication tools, shared objectives, and synergy mechanics that reward teamwork.',
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="card card-hover flex gap-4 items-start p-5"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-bz-red/10 border border-bz-red/30 flex items-center justify-center">
                  <Icon size={20} className="text-bz-red" />
                </div>
                <div>
                  <h3 className="font-display text-sm text-bz-white tracking-wider mb-1">{title}</h3>
                  <p className="text-bz-gray text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 4. FEATURES                                                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="features" className="py-24 px-4 sm:px-8 bg-bz-surface">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="PLATFORM" title="CORE FEATURES" sub="Everything a serious operator needs in one unified platform." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: Sword, title: 'BATTLE ARENA', desc: 'Real-time browser-based combat engine with 60fps physics, smooth movement, and zero-lag hit detection.' },
              { icon: Cpu, title: 'MATCHMAKING', desc: 'Intelligent skill-based matchmaking (SBMM) that pairs you against opponents at your exact level — no stomps.' },
              { icon: TrendingUp, title: 'PROGRESSION', desc: 'Earn XP every match, unlock ranks from Bronze to Legend, and chase achievements that prove your dominance.' },
              { icon: Package, title: 'INVENTORY', desc: 'Manage weapons, character skins, emotes, and loadouts. Craft your identity on the battlefield.' },
              { icon: Globe, title: 'LEADERBOARDS', desc: 'Global and regional rankings refreshed in real-time. Fight your way to the top and stay there.' },
              { icon: Shield, title: 'CLAN WARS', desc: 'Form or join clans, compete in 7-day seasonal wars, and earn exclusive clan-only cosmetics and prizes.' },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="card card-hover p-6 group"
              >
                <div className="w-12 h-12 mb-4 rounded-sm bg-bz-red/10 border border-bz-red/20 flex items-center justify-center group-hover:bg-bz-red/20 group-hover:border-bz-red/50 transition-colors">
                  <Icon size={22} className="text-bz-red" />
                </div>
                <h3 className="font-display text-sm text-bz-white tracking-wider mb-2">{title}</h3>
                <p className="text-bz-gray text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 5. GAME MODES                                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="modes" className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="GAMEPLAY" title="GAME MODES" sub="Every mode is a different kind of war. Choose your battlefield." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Target,
                title: 'SOLO BATTLE',
                players: '1 vs 19',
                badge: 'badge-red',
                badgeText: 'SOLO',
                desc: 'Drop in alone. Twenty players enter, one walks out. Prove individual supremacy in the ultimate test of skill.',
                color: 'border-bz-red/30',
              },
              {
                icon: Users,
                title: 'DUO COMBAT',
                players: '2 vs 18',
                badge: 'badge-cyan',
                badgeText: 'DUO',
                desc: 'Partner up, communicate, and out-manoeuvre ten opposing duos. Trust your partner with your life.',
                color: 'border-cyan-500/30',
              },
              {
                icon: Shield,
                title: 'SQUAD WAR',
                players: '4-player squads',
                badge: 'badge-green',
                badgeText: 'SQUAD',
                desc: 'Four-man tactical units clash across the zone. Role-based strategy and pinpoint coordination win matches.',
                color: 'border-green-500/30',
              },
              {
                icon: Zap,
                title: 'TEAM DEATHMATCH',
                players: '10 vs 10',
                badge: 'badge-gold',
                badgeText: 'TDM',
                desc: 'Fast-paced elimination. Two teams of ten battle for the highest kill count before the clock expires.',
                color: 'border-bz-gold/30',
              },
              {
                icon: Star,
                title: 'PRACTICE ZONE',
                players: 'Unlimited',
                badge: 'badge-gray',
                badgeText: 'TRAINING',
                desc: 'Warm up, test loadouts, and refine aim with zero stakes. Your personal proving ground, available 24/7.',
                color: 'border-bz-border',
              },
            ].map(({ icon: Icon, title, players, badge, badgeText, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                viewport={{ once: true }}
                className={clsx('card card-hover p-6 border', color)}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={24} className="text-bz-red" />
                  <span className={badge}>{badgeText}</span>
                </div>
                <h3 className="font-display text-sm text-bz-white tracking-wider mb-1">{title}</h3>
                <p className="font-mono text-xs text-bz-red mb-3">{players}</p>
                <p className="text-bz-gray text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}

            {/* Wide CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.55 }}
              viewport={{ once: true }}
              className="card card-red p-6 flex flex-col justify-between sm:col-span-2 lg:col-span-1"
            >
              <div>
                <Crown size={24} className="text-bz-gold mb-4" />
                <h3 className="font-display text-sm text-bz-white tracking-wider mb-1">RANKED MODE</h3>
                <p className="font-mono text-xs text-bz-gold mb-3">COMING SOON</p>
                <p className="text-bz-gray text-sm leading-relaxed">
                  Full competitive ranked ladder with placement matches, seasonal resets, and exclusive rewards for the top percentile.
                </p>
              </div>
              <div className="mt-4">
                <span className="badge-gold">SEASON 4 EXCLUSIVE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 6. PLAYER STATISTICS                                       */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section
        id="stats"
        className="py-24 px-4 sm:px-8 relative overflow-hidden"
      >
        {/* Background tint */}
        <div className="absolute inset-0 bg-bz-red/[0.04] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-sm opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <SectionHeader label="METRICS" title="BATTLEZONE BY THE NUMBERS" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 48291, suffix: '+', label: 'REGISTERED OPERATORS', icon: Users },
              { value: 3847, suffix: '', label: 'ACTIVE RIGHT NOW', icon: Radio },
              { value: 1200000, suffix: '+', label: 'MATCHES COMPLETED', icon: Sword },
              { value: 28400000, suffix: '+', label: 'ELIMINATIONS', icon: Skull },
            ].map(({ value, suffix, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                className="card p-6 text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-bz-red scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <Icon size={28} className="text-bz-red mx-auto mb-3 opacity-70" />
                <div className="text-3xl sm:text-4xl font-mono font-black text-bz-red mb-2">
                  <AnimatedCounter target={value} suffix={suffix} />
                </div>
                <div className="font-display text-xs text-bz-gray tracking-widest">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 7. WEAPONS SHOWCASE                                        */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="arsenal" className="py-24 px-4 sm:px-8 bg-bz-surface">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="EQUIPMENT" title="ARSENAL" sub="Wield precision-engineered weapons. Each one crafted for a different playstyle." />

          {/* Horizontal scroll wrapper on mobile */}
          <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {featuredWeapons.map((weapon, i) => (
              <motion.div
                key={weapon.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.13, duration: 0.5 }}
                viewport={{ once: true }}
                className="card card-hover p-5 min-w-[260px] sm:min-w-0 snap-start flex-shrink-0 sm:flex-shrink"
              >
                {/* Weapon header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-xs text-bz-white tracking-wider">{weapon.name}</h3>
                    <p className="font-mono text-xs text-bz-gray mt-0.5">{weapon.category}</p>
                  </div>
                  <span className={rarityClass(weapon.rarity)}>{weapon.rarity}</span>
                </div>

                {/* Weapon visual placeholder */}
                <div
                  className="relative h-20 mb-5 rounded-sm overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${weapon.color}18, transparent)`, border: `1px solid ${weapon.color}30` }}
                >
                  <div className="absolute inset-0 bg-grid-sm opacity-30" />
                  <Sword size={36} style={{ color: weapon.color }} className="opacity-70" />
                </div>

                {/* Stat bars */}
                <div className="space-y-3">
                  <StatBar label="DAMAGE" value={weapon.damage} max={150} />
                  <StatBar label="RANGE" value={weapon.range} max={100} />
                  <StatBar label="ACCURACY" value={weapon.accuracy} max={100} />
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-bz-gray">KILLS</span>
                  <span className="text-bz-red font-bold">{weapon.kills.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 8. MAPS SHOWCASE                                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="maps" className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="ENVIRONMENTS" title="COMBAT ZONES" sub="Three arenas. Three different wars. Master them all." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'CRIMSON VALLEY',
                tagline: 'High altitude long-range warfare',
                terrain: 'MOUNTAINOUS',
                mode: 'SOLO / SQUAD',
                gradient: 'from-red-950 via-bz-surface to-bz-black',
                accentColor: '#ff1a1a',
                desc: 'Rocky peaks, cliff chokepoints, and deadly vertical sightlines. Snipers rule — until they don\'t.',
              },
              {
                name: 'IRON FORTRESS',
                tagline: 'Urban close-quarters combat',
                terrain: 'URBAN',
                mode: 'TDM / DUO',
                gradient: 'from-slate-900 via-bz-surface to-bz-black',
                accentColor: '#60a5fa',
                desc: 'Collapsed skyscrapers, narrow alleys, and blind corners. SMGs and shotguns reign supreme.',
              },
              {
                name: 'SHADOW DESERT',
                tagline: 'Open terrain tactical movement',
                terrain: 'ARID',
                mode: 'SQUAD / SOLO',
                gradient: 'from-amber-950 via-bz-surface to-bz-black',
                accentColor: '#fbbf24',
                desc: 'Flat dunes, sparse cover, and dust storms that shift visibility. Positioning and movement are everything.',
              },
            ].map(({ name, tagline, terrain, mode, gradient, accentColor, desc }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                className="card card-hover overflow-hidden group cursor-pointer"
              >
                {/* Map visual */}
                <div className={clsx('relative h-44 bg-gradient-to-br', gradient)}>
                  <div className="absolute inset-0 bg-grid opacity-30" />
                  <HudCorners />
                  {/* Centre label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Map size={32} style={{ color: accentColor }} className="opacity-60 mb-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-display text-xs tracking-widest" style={{ color: accentColor }}>{name}</span>
                  </div>
                  {/* Corner ping dot */}
                  <div className="absolute top-3 right-3">
                    <span className="online-dot" />
                  </div>
                </div>

                {/* Map info */}
                <div className="p-5">
                  <p className="text-bz-gray text-xs mb-3 leading-relaxed">{desc}</p>
                  <p className="text-bz-gray text-xs italic mb-4">{tagline}</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="badge-gray">{terrain}</span>
                    <span className="badge-red">{mode}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 9. LEADERBOARD PREVIEW                                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="leaderboard" className="py-24 px-4 sm:px-8 bg-bz-surface">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label="RANKINGS" title="TOP OPERATORS" sub="The elite few who've clawed their way to the summit." />

          <div className="card overflow-hidden">
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 px-5 py-3 bg-bz-surface2 border-b border-bz-border">
              {['#', 'OPERATOR', 'LVL', 'WINS', 'KILLS', 'K/D'].map((h, i) => (
                <div
                  key={h}
                  className={clsx(
                    'font-display text-xs text-bz-gray tracking-widest',
                    i === 0 ? 'col-span-1' : i === 1 ? 'col-span-5' : 'col-span-2 text-center',
                  )}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {top5.map((player, i) => {
              const isFirst = player.rank === 1
              return (
                <motion.div
                  key={player.username}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={clsx(
                    'grid grid-cols-12 items-center px-5 py-4 border-b border-bz-border/50 hover:bg-bz-surface2 transition-colors',
                    isFirst && 'bg-bz-gold/[0.05] border-b-bz-gold/20',
                  )}
                >
                  {/* Rank */}
                  <div className="col-span-1">
                    {isFirst ? (
                      <Crown size={18} className="text-bz-gold" />
                    ) : (
                      <span className={clsx('font-mono font-bold text-sm', isFirst ? 'text-bz-gold' : 'text-bz-gray')}>
                        #{player.rank}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <div className="col-span-7 sm:col-span-5 flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className={clsx(
                      'w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold flex-shrink-0',
                      isFirst ? 'bg-bz-gold/20 text-bz-gold border border-bz-gold/40' : 'bg-bz-surface2 text-bz-gray border border-bz-border',
                    )}>
                      {player.badge || player.username[0]}
                    </div>
                    <div>
                      <div className={clsx('font-display text-xs tracking-wide', isFirst ? 'text-bz-gold' : 'text-bz-white')}>
                        {player.username}
                      </div>
                      <div className="text-bz-gray text-xs font-mono sm:hidden">
                        LVL {player.level} · {player.kd} K/D
                      </div>
                    </div>
                  </div>

                  {/* Desktop stats */}
                  <div className={clsx('col-span-2 text-center font-mono text-sm hidden sm:block', isFirst ? 'text-bz-gold' : 'text-bz-white')}>
                    {player.level}
                  </div>
                  <div className={clsx('col-span-2 text-center font-mono text-sm hidden sm:block', isFirst ? 'text-bz-gold' : 'text-bz-white')}>
                    {player.wins.toLocaleString()}
                  </div>
                  <div className={clsx('col-span-2 text-center font-mono text-sm hidden sm:block', isFirst ? 'text-bz-gold' : 'text-bz-white')}>
                    {player.kills.toLocaleString()}
                  </div>
                  <div className={clsx('col-span-2 text-center font-mono text-sm font-bold hidden sm:block', isFirst ? 'text-bz-gold' : 'text-bz-red')}>
                    {player.kd}
                  </div>

                  {/* Mobile K/D pill */}
                  <div className="col-span-4 sm:hidden text-right">
                    <span className="font-mono text-xs text-bz-red font-bold">{player.kd} K/D</span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <button
              className="btn-outline px-8 py-3 text-sm flex items-center gap-2 mx-auto"
              onClick={() => navigate('/leaderboard')}
            >
              VIEW FULL LEADERBOARD
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 10. ACHIEVEMENTS                                           */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="achievements" className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="MILESTONES" title="ACHIEVEMENTS" sub="Push beyond the ordinary. Every badge tells a story of skill and persistence." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredAchievements.map((ach, i) => (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className={clsx('card card-hover p-5 relative overflow-hidden', !ach.unlocked && 'opacity-50')}
              >
                {/* Lock overlay */}
                {!ach.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bz-black/40 backdrop-blur-[2px] z-10">
                    <Lock size={28} className="text-bz-gray" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={clsx(
                    'text-3xl w-12 h-12 flex items-center justify-center rounded-sm flex-shrink-0 border',
                    ach.rarity === 'LEGENDARY' ? 'bg-bz-gold/10 border-bz-gold/30'
                      : ach.rarity === 'EPIC' ? 'bg-purple-500/10 border-purple-500/30'
                        : ach.rarity === 'RARE' ? 'bg-cyan-500/10 border-cyan-500/30'
                          : 'bg-bz-surface2 border-bz-border',
                  )}>
                    {ach.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-xs text-bz-white tracking-wider">{ach.name}</h3>
                      <span className={rarityClass(ach.rarity)}>{ach.rarity}</span>
                    </div>
                    <p className="text-bz-gray text-xs leading-relaxed mb-3">{ach.description}</p>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-bz-gray">{ach.unlocked ? 'COMPLETED' : `${ach.progress} / ${ach.total}`}</span>
                        <span className="text-bz-gold">+{ach.xpReward.toLocaleString()} XP</span>
                      </div>
                      <div className="stat-bar">
                        <div
                          className={clsx('stat-bar-fill', ach.unlocked ? 'bg-bz-green' : 'bg-bz-red')}
                          style={{ width: `${Math.min(100, (ach.progress / ach.total) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 11. COMMUNITY                                              */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="community" className="py-24 px-4 sm:px-8 bg-bz-surface">
        <div className="max-w-7xl mx-auto">
          <SectionHeader label="SOCIAL" title="JOIN THE BATTLEZONE COMMUNITY" />
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: text */}
            <div className="space-y-5">
              <p className="text-bz-gray leading-relaxed">
                BATTLEZONE X is more than a game — it's a movement. Tens of thousands of operators worldwide
                compete, strategize, and grow together every day. Whether you're a fresh recruit or a seasoned
                veteran, there's a place for you in the zone.
              </p>
              <p className="text-bz-gray leading-relaxed">
                Collaborate in our Discord, share clips on social media, watch pro-level streams on YouTube,
                and compete in monthly community tournaments with real prize pools. Your next squad is waiting.
              </p>

              {/* Social buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  { icon: MessageCircle, label: 'DISCORD', color: 'text-indigo-400', border: 'border-indigo-400/30 hover:border-indigo-400 hover:bg-indigo-400/10' },
                  { icon: Twitter, label: 'TWITTER / X', color: 'text-sky-400', border: 'border-sky-400/30 hover:border-sky-400 hover:bg-sky-400/10' },
                  { icon: Youtube, label: 'YOUTUBE', color: 'text-red-500', border: 'border-red-500/30 hover:border-red-500 hover:bg-red-500/10' },
                ].map(({ icon: Icon, label, color, border }) => (
                  <button
                    key={label}
                    className={clsx(
                      'btn-ghost flex items-center gap-2 text-xs px-5 py-2.5 border transition-all duration-200',
                      color, border,
                    )}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: community stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
              {[
                { icon: MessageCircle, label: 'DISCORD MEMBERS', value: '25,000+', color: 'text-indigo-400', bg: 'bg-indigo-400/10 border-indigo-400/20' },
                { icon: Trophy, label: 'MONTHLY TOURNAMENTS', value: '48', color: 'text-bz-gold', bg: 'bg-bz-gold/10 border-bz-gold/20' },
                { icon: Award, label: 'MONTHLY PRIZE POOL', value: '$5,000+', color: 'text-bz-green', bg: 'bg-bz-green/10 border-bz-green/20' },
              ].map(({ icon: Icon, label, value, color, bg }) => (
                <div key={label} className={clsx('card p-5 flex items-center gap-4 border', bg)}>
                  <div className={clsx('w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0', bg)}>
                    <Icon size={22} className={color} />
                  </div>
                  <div>
                    <div className={clsx('font-mono text-2xl font-black', color)}>{value}</div>
                    <div className="font-display text-xs text-bz-gray tracking-widest">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 12. CTA                                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <Section id="cta" className="relative py-28 px-4 sm:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-bz-red/[0.06] pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

        {/* Particles */}
        {particles.slice(0, 14).map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} delay={p.delay + 1} size={p.size} />
        ))}

        {/* Red glow lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-bz-red/40" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-bz-red/40" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative inline-block p-8 sm:p-12 w-full">
              <HudCorners />
              <span className="badge-red font-display text-xs tracking-widest mb-6 inline-block">
                FREE TO PLAY
              </span>
              <h2 className="heading-section text-gradient-red mb-4">
                READY TO ENTER THE ZONE?
              </h2>
              <p className="text-bz-gray mb-10 leading-relaxed">
                Join 48,000+ operators already competing in BATTLEZONE X.
                No download. No cost. Just victory — or defeat.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="btn-primary px-10 py-3 text-sm shadow-red-glow flex items-center justify-center gap-2"
                  onClick={() => navigate('/register')}
                >
                  <Play size={16} fill="currentColor" />
                  REGISTER FREE
                </button>
                <button
                  className="btn-outline px-10 py-3 text-sm"
                  onClick={() => navigate('/login')}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* 13. FOOTER                                                 */}
      {/* ─────────────────────────────────────────────────────────── */}
      <footer className="bg-bz-surface border-t border-bz-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="clip-hex bg-bz-red w-8 h-8 flex items-center justify-center shadow-red-glow-sm">
                  <span className="font-display font-black text-white text-xs">BX</span>
                </div>
                <span className="font-display font-black text-bz-white tracking-widest text-sm">
                  BATTLEZONE <span className="text-bz-red">X</span>
                </span>
              </div>
              <p className="text-bz-gray text-xs leading-relaxed">
                The premium browser-based esports combat platform. Enter the zone. Dominate.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-xs text-bz-white tracking-widest mb-4">PLATFORM</h4>
              <ul className="space-y-2">
                {['About', 'Game Modes', 'Leaderboard', 'Community', 'Tournaments'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-bz-gray text-xs hover:text-bz-red transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-display text-xs text-bz-white tracking-widest mb-4">SUPPORT</h4>
              <ul className="space-y-2">
                {['Help Center', 'Report Bug', 'Privacy Policy', 'Terms of Service', 'Careers'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-bz-gray text-xs hover:text-bz-red transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-display text-xs text-bz-white tracking-widest mb-4">CONNECT</h4>
              <div className="flex gap-3">
                {[MessageCircle, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-sm bg-bz-surface2 border border-bz-border flex items-center justify-center text-bz-gray hover:text-bz-red hover:border-bz-red/40 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-bz-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-xs text-bz-gray text-center sm:text-left">
              © 2026 BATTLEZONE X. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-4">
              {['Terms', 'Privacy', 'Cookies'].map((l) => (
                <a key={l} href="#" className="font-mono text-xs text-bz-gray hover:text-bz-red transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
