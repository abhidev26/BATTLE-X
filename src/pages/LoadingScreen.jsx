import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Wifi, Cpu, Shield, Database, CheckCircle2 } from 'lucide-react'

/**
 * Cinematic loading screen for BATTLEZONE X
 * Features: animated red grid, floating particles, hex logo pulse,
 * glitch title, sequential step reveals, draining progress bar,
 * and a final [ENTER BATTLEZONE] CTA.
 *
 * @param {function} onComplete - Callback when player clicks Enter
 */

const STEPS = [
  { id: 0, text: 'INITIALIZING SYSTEM...', icon: Cpu },
  { id: 1, text: 'LOADING GAME ENGINE...', icon: Database },
  { id: 2, text: 'CONNECTING SERVER...', icon: Wifi },
  { id: 3, text: 'AUTHENTICATING...', icon: Shield },
  { id: 4, text: 'SYSTEM READY', icon: CheckCircle2 },
]

const STEP_DELAY = 900 // ms between each step appearing

// ─── Floating particle ───────────────────────────────────────────────────────
function Particle({ style }) {
  return (
    <motion.div
      className="absolute w-[2px] h-[2px] bg-bz-red rounded-full"
      style={style}
      animate={{ y: [0, -260], opacity: [0, 0.8, 0] }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        delay: style.delay,
        ease: 'easeOut',
      }}
      aria-hidden="true"
    />
  )
}

// ─── Glitch text ─────────────────────────────────────────────────────────────
function GlitchTitle() {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 120)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative select-none" aria-label="Battlezone X">
      <h1
        className={`font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.15em] text-bz-white uppercase ${
          glitch ? 'animate-glitch' : ''
        }`}
      >
        BATTLEZONE
        <span className="text-bz-red"> X</span>
      </h1>
      {/* Glitch layers */}
      {glitch && (
        <>
          <span
            className="absolute inset-0 font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.15em] uppercase text-bz-red opacity-70 pointer-events-none"
            style={{ clipPath: 'inset(30% 0 50% 0)', transform: 'translateX(-4px)' }}
            aria-hidden="true"
          >
            BATTLEZONE X
          </span>
          <span
            className="absolute inset-0 font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.15em] uppercase text-cyan-400 opacity-40 pointer-events-none"
            style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(4px)' }}
            aria-hidden="true"
          >
            BATTLEZONE X
          </span>
        </>
      )}
    </div>
  )
}

// ─── Hex logo ─────────────────────────────────────────────────────────────────
function HexLogo() {
  return (
    <motion.div
      animate={{ scale: [1, 1.06, 1], filter: ['brightness(1)', 'brightness(1.4)', 'brightness(1)'] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mb-8"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <motion.div
        className="w-28 h-28 rounded-full border-2 border-bz-red/40 absolute inset-0 m-auto"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="w-20 h-20 rounded-full border border-bz-red/20 absolute inset-0 m-auto"
        animate={{ rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      {/* Hex body */}
      <div className="relative z-10 w-24 h-24 clip-hex bg-gradient-to-br from-bz-red to-[#8b0000] flex items-center justify-center shadow-red-glow">
        <span className="font-display text-3xl font-black text-bz-white tracking-tight">BX</span>
      </div>
    </motion.div>
  )
}

// ─── Loading Screen ────────────────────────────────────────────────────────────
export default function LoadingScreen({ onComplete }) {
  const [visibleSteps, setVisibleSteps] = useState(0)
  const [done, setDone] = useState(false)
  const timers = useRef([])

  // Sequentially reveal steps
  useEffect(() => {
    STEPS.forEach((_, i) => {
      const t = setTimeout(() => {
        setVisibleSteps(i + 1)
        if (i === STEPS.length - 1) {
          setTimeout(() => setDone(true), 500)
        }
      }, 800 + i * STEP_DELAY)
      timers.current.push(t)
    })
    return () => timers.current.forEach(clearTimeout)
  }, [])

  // Progress value derived from visible steps
  const progress = Math.round((visibleSteps / STEPS.length) * 100)

  // Generate deterministic particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    left: `${(i * 2.5) % 100}%`,
    bottom: `${(i * 7) % 20}%`,
    duration: 3 + (i % 4),
    delay: (i * 0.25) % 5,
  }))

  return (
    <div className="fixed inset-0 z-50 bg-bz-black flex flex-col items-center justify-center overflow-hidden" role="main" aria-label="Loading Battlezone X">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden="true" />

      {/* Red radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,26,26,0.08) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <Particle key={i} style={p} />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-2xl">
        <HexLogo />

        <GlitchTitle />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-display text-bz-red text-xs sm:text-sm tracking-[0.4em] uppercase mt-3 mb-10"
          style={{ textShadow: '0 0 20px rgba(255,26,26,0.8)' }}
        >
          ELITE ESPORTS PLATFORM
        </motion.p>

        {/* Loading steps */}
        <div className="w-full space-y-2 mb-8" role="log" aria-label="Loading progress steps" aria-live="polite">
          <AnimatePresence>
            {STEPS.slice(0, visibleSteps).map((step) => {
              const StepIcon = step.icon
              const isLast = step.id === STEPS.length - 1
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="flex items-center gap-3"
                  aria-label={step.text}
                >
                  <StepIcon
                    size={14}
                    className={isLast ? 'text-bz-green' : 'text-bz-red'}
                    aria-hidden="true"
                  />
                  <span
                    className={`font-mono text-xs tracking-widest ${
                      isLast ? 'text-bz-green' : 'text-bz-gray'
                    }`}
                  >
                    {step.text}
                  </span>
                  {isLast && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      className="ml-auto text-[10px] font-mono text-bz-green tracking-widest"
                    >
                      OK
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="w-full mb-10" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Loading progress">
          <div className="flex justify-between mb-1.5">
            <span className="font-mono text-[10px] text-bz-gray tracking-widest">LOADING</span>
            <span className="font-mono text-[10px] text-bz-red">{progress}%</span>
          </div>
          <div className="h-[3px] w-full bg-bz-surface2 border border-bz-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-bz-red shadow-red-glow-sm rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Enter button */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.button
                onClick={onComplete}
                animate={{
                  boxShadow: [
                    '0 0 12px rgba(255,26,26,0.4)',
                    '0 0 28px rgba(255,26,26,0.8)',
                    '0 0 12px rgba(255,26,26,0.4)',
                  ],
                }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-10 py-4 text-base tracking-[0.25em] flex items-center gap-3 font-display uppercase"
                aria-label="Enter Battlezone"
              >
                ENTER BATTLEZONE
                <ChevronRight size={18} aria-hidden="true" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner HUD decorations */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-bz-red/40" aria-hidden="true" />
        <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-bz-red/40" aria-hidden="true" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-bz-red/40" aria-hidden="true" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-bz-red/40" aria-hidden="true" />
      </div>

      {/* Version tag */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 font-mono text-[10px] text-bz-gray tracking-widest"
        aria-hidden="true"
      >
        v2.5.1-SEASON4 &nbsp;|&nbsp; BUILD 20260930
      </motion.p>
    </div>
  )
}
