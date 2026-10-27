import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Loader2, Shield, Zap, Globe, Trophy, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useAuth } from '@/context/AuthContext'

// ─── Floating Particle ───────────────────────────────────────────────────────
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full bg-bz-red/20 pointer-events-none"
      style={style}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: style.delay,
      }}
    />
  )
}

// ─── Brand Panel (left side) ──────────────────────────────────────────────────
function BrandPanel() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    width: Math.random() * 6 + 2 + 'px',
    height: Math.random() * 6 + 2 + 'px',
    left: Math.random() * 100 + '%',
    top: Math.random() * 100 + '%',
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }))

  const features = [
    { icon: Zap, text: 'Real-time multiplayer combat with sub-20ms tick rate' },
    { icon: Trophy, text: 'Competitive ranked play across 7 skill divisions' },
    { icon: Globe, text: 'Global leaderboards with 2M+ registered operators' },
  ]

  return (
    <div className="relative hidden lg:flex flex-col justify-between h-full overflow-hidden bg-bz-black">
      {/* Dark red gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bz-red/10 via-bz-black to-bz-black" />
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Animated particles */}
      {particles.map((p, i) => <Particle key={i} style={p} />)}
      {/* Top-left corner HUD bracket */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-bz-red/60" />
      {/* Bottom-right corner HUD bracket */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-bz-red/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-12 py-16 gap-12">
        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex items-center justify-center w-16 h-16 bg-bz-red/10 border border-bz-red/40 rounded clip-hex shadow-red-glow">
              <Shield className="w-8 h-8 text-bz-red" />
              <div className="absolute inset-0 bg-bz-red/5 rounded animate-pulse-red" />
            </div>
            <div>
              <div className="font-display text-3xl font-black text-bz-white tracking-widest leading-none">
                BATTLE<span className="text-bz-red">ZONE</span>
              </div>
              <div className="font-mono text-xs text-bz-gray tracking-[0.4em] mt-1">
                PROTOCOL X — v4.1.0
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-4xl xl:text-5xl font-black text-bz-white leading-tight">
              ENTER THE ZONE.
            </h1>
            <h1 className="font-display text-4xl xl:text-5xl font-black text-bz-red leading-tight">
              SURVIVE.
            </h1>
            <h1 className="font-display text-4xl xl:text-5xl font-black text-gradient-red leading-tight">
              DOMINATE.
            </h1>
          </div>
        </motion.div>

        {/* Feature bullets */}
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
        >
          {features.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
            >
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-bz-red/10 border border-bz-red/30 rounded">
                <Icon className="w-4 h-4 text-bz-red" />
              </div>
              <p className="font-sans text-sm text-bz-gray leading-relaxed pt-1">{text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom status bar */}
        <motion.div
          className="flex items-center gap-2 border-t border-bz-border pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="online-dot" />
          <span className="font-mono text-xs text-bz-gray">
            <span className="text-bz-green font-semibold">47,382</span> operators online
          </span>
          <span className="ml-auto font-mono text-xs text-bz-gray/50">SRV-NA-EAST-01</span>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Login Page ───────────────────────────────────────────────────────────────
export default function Login() {
  const { login, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/dashboard'

  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate(from, { replace: true })
  }, [user, navigate, from])

  // ── Validation ──
  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'
    if (!form.password) errs.password = 'Password is required.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    // Clear field error on change
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }))
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    setError('')
    try {
      await login({ email: form.email, password: form.password, remember: form.remember })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Invalid credentials. Check your email and password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex bg-bz-black overflow-hidden">
      {/* Left Brand Panel */}
      <div className="lg:w-1/2 xl:w-[55%]">
        <BrandPanel />
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-12 relative">
        {/* Subtle background grid for right panel */}
        <div className="absolute inset-0 bg-grid-sm opacity-10 pointer-events-none" />
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-bz-red/20" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-bz-red/20" />

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="flex items-center justify-center w-10 h-10 bg-bz-red/10 border border-bz-red/40 rounded">
              <Shield className="w-5 h-5 text-bz-red" />
            </div>
            <span className="font-display text-2xl font-black tracking-widest">
              BATTLE<span className="text-bz-red">ZONE</span>
            </span>
          </div>

          {/* Card */}
          <div className="card-glass rounded-lg p-8 border border-bz-border shadow-card">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-black text-bz-white tracking-wider mb-2">
                OPERATOR LOGIN
              </h2>
              {/* Red accent line */}
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-12 bg-bz-red shadow-red-glow-sm" />
                <div className="h-0.5 w-4 bg-bz-red/40" />
                <div className="h-0.5 w-2 bg-bz-red/20" />
              </div>
              <p className="text-muted mt-3 text-sm">Access your operator profile and mission data.</p>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-start gap-3 mb-5 p-3 rounded border border-bz-red/40 bg-bz-red/10"
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertCircle className="w-4 h-4 text-bz-red flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-bz-red leading-snug">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Email */}
              <div>
                <label className="input-label">Email Address</label>
                <input
                  className={clsx('input w-full', fieldErrors.email && 'border-bz-red/60 focus:border-bz-red')}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="operator@battlezone.gg"
                  autoComplete="email"
                  disabled={loading}
                />
                <AnimatePresence>
                  {fieldErrors.email && (
                    <motion.p
                      className="text-xs text-bz-red mt-1 flex items-center gap-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="input-label mb-0">Password</label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-bz-red/70 hover:text-bz-red transition-colors font-mono tracking-wide"
                  >
                    FORGOT PASSWORD?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className={clsx('input w-full pr-11', fieldErrors.password && 'border-bz-red/60 focus:border-bz-red')}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••"
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-bz-gray hover:text-bz-white transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {fieldErrors.password && (
                    <motion.p
                      className="text-xs text-bz-red mt-1 flex items-center gap-1"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Remember me */}
              <label className="flex items-center gap-3 cursor-pointer group select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="sr-only"
                    disabled={loading}
                  />
                  <div className={clsx(
                    'w-4 h-4 rounded border transition-all',
                    form.remember
                      ? 'bg-bz-red border-bz-red shadow-red-glow-sm'
                      : 'bg-transparent border-bz-border group-hover:border-bz-red/50'
                  )}>
                    {form.remember && (
                      <svg className="w-3 h-3 text-white m-auto mt-0.5" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-bz-gray group-hover:text-bz-white transition-colors">
                  Remember this device
                </span>
              </label>

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                disabled={loading}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>LOGIN</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-bz-border" />
              <span className="font-mono text-xs text-bz-gray/60 tracking-widest">OR CONTINUE AS GUEST</span>
              <div className="flex-1 h-px bg-bz-border" />
            </div>

            {/* Guest Button */}
            <motion.button
              className="btn-ghost w-full"
              onClick={() => navigate('/dashboard')}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
            >
              PLAY AS GUEST
            </motion.button>

            {/* Register link */}
            <p className="text-center text-sm text-bz-gray mt-6">
              NEW OPERATOR?{' '}
              <Link
                to="/register"
                className="text-bz-red hover:text-bz-white font-display font-bold tracking-wider transition-colors hover:underline"
              >
                REGISTER NOW
              </Link>
            </p>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-bz-gray/40 font-mono mt-4">
            BATTLEZONE X © 2026 — ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </div>
    </div>
  )
}
