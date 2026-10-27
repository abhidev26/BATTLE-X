import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye, EyeOff, Loader2, Shield, CheckCircle2, AlertCircle,
  Mail, RotateCcw, ChevronRight, User, Lock
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAuth } from '@/context/AuthContext'

// ─── Password Strength ────────────────────────────────────────────────────────
/**
 * Returns { score: 0-4, label, color } for a given password string.
 */
function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: '', color: '' }
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  const map = [
    { label: 'TOO WEAK', color: 'bg-bz-red' },
    { label: 'WEAK', color: 'bg-orange-500' },
    { label: 'FAIR', color: 'bg-yellow-500' },
    { label: 'STRONG', color: 'bg-bz-green' },
    { label: 'VERY STRONG', color: 'bg-emerald-400' },
  ]
  return { score, ...map[score] }
}

// ─── OTP Input ────────────────────────────────────────────────────────────────
function OtpInput({ value, onChange, disabled }) {
  const inputs = useRef([])

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !value[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handleChange = (e, idx) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const arr = value.split('')
    arr[idx] = char
    const next = arr.join('').padEnd(6, ' ').slice(0, 6)
    onChange(next.trimEnd())
    if (char && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center" onPaste={handlePaste}>
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputs.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          disabled={disabled}
          className={clsx(
            'w-11 h-14 text-center font-mono text-xl font-bold rounded border transition-all outline-none',
            'bg-bz-surface text-bz-white',
            value[i]
              ? 'border-bz-red shadow-red-glow-sm text-bz-red'
              : 'border-bz-border focus:border-bz-red/60',
            'disabled:opacity-50'
          )}
        />
      ))}
    </div>
  )
}

// ─── Brand Panel (shared, slightly different from Login) ──────────────────────
function BrandPanel() {
  return (
    <div className="relative hidden lg:flex flex-col justify-center h-full overflow-hidden bg-bz-black px-12 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-bz-red/8 via-bz-black to-bz-black" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-bz-red/50" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-bz-red/50" />

      <div className="relative z-10 space-y-10">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-bz-red/10 border border-bz-red/40 rounded clip-hex shadow-red-glow">
              <Shield className="w-8 h-8 text-bz-red" />
            </div>
            <div>
              <div className="font-display text-3xl font-black text-bz-white tracking-widest">
                BATTLE<span className="text-bz-red">ZONE</span>
              </div>
              <div className="font-mono text-xs text-bz-gray tracking-[0.4em] mt-1">
                OPERATOR REGISTRATION
              </div>
            </div>
          </div>

          <h2 className="font-display text-4xl xl:text-5xl font-black text-bz-white leading-tight mb-3">
            JOIN THE<br />
            <span className="text-bz-red">ELITE.</span>
          </h2>
          <p className="font-sans text-bz-gray text-sm leading-relaxed max-w-xs">
            Create your operator profile and enter the most competitive arena on the planet. Claim your rank. Build your legacy.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="grid grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { val: '2.1M+', label: 'OPERATORS' },
            { val: '#1', label: 'ESPORTS PLATFORM' },
            { val: '24/7', label: 'ACTIVE SERVERS' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center border border-bz-border/60 rounded p-3 bg-bz-surface/40">
              <div className="font-mono text-lg font-bold text-bz-red">{val}</div>
              <div className="font-mono text-[10px] text-bz-gray mt-1 tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center gap-2 border-t border-bz-border pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="online-dot" />
          <span className="font-mono text-xs text-bz-gray">Registration open — all skill levels welcome</span>
        </motion.div>
      </div>
    </div>
  )
}

// ─── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const steps = [
    { n: 1, label: 'ACCOUNT' },
    { n: 2, label: 'VERIFY' },
  ]
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map(({ n, label }, i) => (
        <div key={n} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={clsx(
              'flex items-center justify-center w-7 h-7 rounded font-mono text-xs font-bold transition-all',
              current === n
                ? 'bg-bz-red text-white shadow-red-glow-sm'
                : current > n
                  ? 'bg-bz-green/20 border border-bz-green text-bz-green'
                  : 'bg-bz-surface border border-bz-border text-bz-gray'
            )}>
              {current > n ? <CheckCircle2 className="w-4 h-4" /> : n}
            </div>
            <span className={clsx(
              'font-mono text-xs tracking-widest transition-colors',
              current === n ? 'text-bz-white' : 'text-bz-gray'
            )}>
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className="flex items-center mx-3">
              <div className={clsx('h-px w-8 transition-colors', current > 1 ? 'bg-bz-green/50' : 'bg-bz-border')} />
              <ChevronRight className="w-3 h-3 text-bz-border -ml-1" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Register Page ────────────────────────────────────────────────────────────
export default function Register() {
  const { register: registerUser, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { if (user) navigate('/dashboard', { replace: true }) }, [user, navigate])

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [otpTimer, setOtpTimer] = useState(60)
  const [otpSent, setOtpSent] = useState(false)
  const [verifySuccess, setVerifySuccess] = useState(false)

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const pwdStrength = getPasswordStrength(form.password)

  // OTP countdown
  useEffect(() => {
    if (!otpSent || otpTimer <= 0) return
    const interval = setInterval(() => setOtpTimer(t => t - 1), 1000)
    return () => clearInterval(interval)
  }, [otpSent, otpTimer])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }))
    if (error) setError('')
  }

  // ── Step 1 Validation ──
  const validateStep1 = () => {
    const errs = {}
    if (!form.username.trim()) errs.username = 'Username is required.'
    else if (form.username.length < 4) errs.username = 'Username must be at least 4 characters.'
    else if (!/^[a-zA-Z0-9_]+$/.test(form.username)) errs.username = 'Only letters, numbers, and underscores allowed.'

    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address.'

    if (!form.password) errs.password = 'Password is required.'
    else if (form.password.length < 8) errs.password = 'Password must be at least 8 characters.'
    else if (pwdStrength.score < 2) errs.password = 'Password is too weak. Add uppercase letters, numbers, or symbols.'

    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password.'
    else if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match.'

    if (!form.agreeTerms) errs.agreeTerms = 'You must agree to the terms to continue.'

    return errs
  }

  const handleCreateAccount = async (e) => {
    e.preventDefault()
    const errs = validateStep1()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    setLoading(true)
    setError('')
    try {
      // Simulate API call to send OTP
      await new Promise(r => setTimeout(r, 1000))
      setStep(2)
      setOtpSent(true)
      setOtpTimer(60)
    } catch (err) {
      setError(err?.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = useCallback(async () => {
    if (otpTimer > 0) return
    setOtpTimer(60)
    setOtpValue('')
    // Simulate resend
    await new Promise(r => setTimeout(r, 500))
  }, [otpTimer])

  const handleVerify = async (e) => {
    e.preventDefault()
    if (otpValue.replace(/\s/g, '').length < 6) {
      setError('Please enter the complete 6-digit code.')
      return
    }
    setLoading(true)
    setError('')
    try {
      // Simulate OTP verify + account creation
      await new Promise(r => setTimeout(r, 1200))
      if (registerUser) {
        await registerUser({ ...form, otp: otpValue })
      }
      setVerifySuccess(true)
      setTimeout(() => navigate('/dashboard'), 1800)
    } catch (err) {
      setError(err?.message || 'Invalid verification code. Please try again.')
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
        <div className="absolute inset-0 bg-grid-sm opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-bz-red/20" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-bz-red/20" />

        <motion.div
          className="relative w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <Shield className="w-6 h-6 text-bz-red" />
            <span className="font-display text-2xl font-black tracking-widest">
              BATTLE<span className="text-bz-red">ZONE</span>
            </span>
          </div>

          <div className="card-glass rounded-lg p-8 border border-bz-border shadow-card">
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-display text-xl font-black text-bz-white tracking-wider mb-2">
                CREATE OPERATOR ACCOUNT
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-12 bg-bz-red shadow-red-glow-sm" />
                <div className="h-0.5 w-4 bg-bz-red/40" />
              </div>
              <StepIndicator current={step} />
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  className="flex items-start gap-3 mb-5 p-3 rounded border border-bz-red/40 bg-bz-red/10"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <AlertCircle className="w-4 h-4 text-bz-red flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-bz-red">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {/* ── STEP 1: Account Details ── */}
              {step === 1 && (
                <motion.form
                  key="step1"
                  onSubmit={handleCreateAccount}
                  noValidate
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Username */}
                  <div>
                    <label className="input-label">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bz-gray pointer-events-none" />
                      <input
                        className={clsx('input w-full pl-9', fieldErrors.username && 'border-bz-red/60')}
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="ShadowOp_47"
                        autoComplete="username"
                        disabled={loading}
                      />
                    </div>
                    {fieldErrors.username && (
                      <p className="text-xs text-bz-red mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.username}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="input-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bz-gray pointer-events-none" />
                      <input
                        className={clsx('input w-full pl-9', fieldErrors.email && 'border-bz-red/60')}
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="operator@battlezone.gg"
                        autoComplete="email"
                        disabled={loading}
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-xs text-bz-red mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="input-label">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bz-gray pointer-events-none" />
                      <input
                        className={clsx('input w-full pl-9 pr-11', fieldErrors.password && 'border-bz-red/60')}
                        type={showPwd ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Min 8 characters"
                        autoComplete="new-password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-bz-gray hover:text-bz-white transition-colors"
                        tabIndex={-1}
                      >
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Strength Bar */}
                    {form.password && (
                      <motion.div
                        className="mt-2 space-y-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="flex gap-1">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={clsx(
                                'h-1 flex-1 rounded-full transition-all duration-300',
                                i < pwdStrength.score ? pwdStrength.color : 'bg-bz-border'
                              )}
                            />
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={clsx('font-mono text-[10px] tracking-widest', pwdStrength.score >= 3 ? 'text-bz-green' : 'text-bz-gray')}>
                            {pwdStrength.label}
                          </span>
                          <span className="font-mono text-[10px] text-bz-gray/50">{form.password.length} chars</span>
                        </div>
                      </motion.div>
                    )}

                    {fieldErrors.password && (
                      <p className="text-xs text-bz-red mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="input-label">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bz-gray pointer-events-none" />
                      <input
                        className={clsx('input w-full pl-9 pr-11', fieldErrors.confirmPassword && 'border-bz-red/60')}
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        placeholder="Repeat password"
                        autoComplete="new-password"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(v => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-bz-gray hover:text-bz-white transition-colors"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="text-xs text-bz-red mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={form.agreeTerms}
                          onChange={handleChange}
                          className="sr-only"
                          disabled={loading}
                        />
                        <div className={clsx(
                          'w-4 h-4 rounded border transition-all',
                          form.agreeTerms
                            ? 'bg-bz-red border-bz-red shadow-red-glow-sm'
                            : 'bg-transparent border-bz-border group-hover:border-bz-red/50',
                          fieldErrors.agreeTerms && 'border-bz-red/60'
                        )}>
                          {form.agreeTerms && (
                            <svg className="w-3 h-3 text-white m-auto mt-0.5" fill="none" viewBox="0 0 12 12">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-bz-gray leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-bz-red hover:underline">Terms of Service</a>{' '}
                        and{' '}
                        <a href="#" className="text-bz-red hover:underline">Privacy Policy</a>.
                        I am at least 13 years old.
                      </span>
                    </label>
                    {fieldErrors.agreeTerms && (
                      <p className="text-xs text-bz-red mt-1 flex items-center gap-1 ml-7">
                        <AlertCircle className="w-3 h-3" /> {fieldErrors.agreeTerms}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
                    disabled={loading}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING...</>
                    ) : (
                      <><ChevronRight className="w-4 h-4" /> CREATE ACCOUNT</>
                    )}
                  </motion.button>
                </motion.form>
              )}

              {/* ── STEP 2: OTP Verification ── */}
              {step === 2 && (
                <motion.form
                  key="step2"
                  onSubmit={handleVerify}
                  className="space-y-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {verifySuccess ? (
                    <motion.div
                      className="text-center py-8 space-y-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-bz-green/10 border-2 border-bz-green flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-bz-green" />
                        </div>
                      </div>
                      <p className="font-display text-lg text-bz-white">ACCOUNT VERIFIED</p>
                      <p className="text-sm text-bz-gray">Deploying to dashboard...</p>
                      <div className="flex justify-center">
                        <Loader2 className="w-5 h-5 text-bz-red animate-spin" />
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="text-center space-y-2">
                        <div className="flex justify-center mb-4">
                          <div className="w-14 h-14 rounded-full bg-bz-red/10 border border-bz-red/30 flex items-center justify-center">
                            <Mail className="w-6 h-6 text-bz-red" />
                          </div>
                        </div>
                        <p className="font-display text-sm text-bz-white tracking-wider">VERIFY YOUR EMAIL</p>
                        <p className="text-sm text-bz-gray">
                          We sent a 6-digit code to{' '}
                          <span className="text-bz-white font-mono">{form.email}</span>
                        </p>
                      </div>

                      <OtpInput value={otpValue} onChange={setOtpValue} disabled={loading} />

                      {/* Resend */}
                      <div className="text-center">
                        {otpTimer > 0 ? (
                          <p className="text-sm text-bz-gray">
                            Resend code in{' '}
                            <span className="font-mono text-bz-red">{otpTimer}s</span>
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="flex items-center gap-2 mx-auto text-sm text-bz-red hover:text-bz-white transition-colors font-mono"
                          >
                            <RotateCcw className="w-3 h-3" /> RESEND CODE
                          </button>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        className="btn-primary w-full flex items-center justify-center gap-2"
                        disabled={loading || otpValue.replace(/\s/g, '').length < 6}
                        whileTap={{ scale: 0.97 }}
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> VERIFYING...</>
                        ) : (
                          <><CheckCircle2 className="w-4 h-4" /> VERIFY &amp; DEPLOY</>
                        )}
                      </motion.button>

                      <button
                        type="button"
                        onClick={() => { setStep(1); setError(''); setOtpValue('') }}
                        className="btn-ghost w-full text-sm"
                        disabled={loading}
                      >
                        ← BACK TO ACCOUNT DETAILS
                      </button>
                    </>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            {/* Login link */}
            {step === 1 && (
              <p className="text-center text-sm text-bz-gray mt-6">
                ALREADY AN OPERATOR?{' '}
                <Link to="/login" className="text-bz-red hover:text-bz-white font-display font-bold tracking-wider transition-colors hover:underline">
                  LOGIN
                </Link>
              </p>
            )}
          </div>

          <p className="text-center text-xs text-bz-gray/40 font-mono mt-4">
            BATTLEZONE X © 2026 — ALL RIGHTS RESERVED
          </p>
        </motion.div>
      </div>
    </div>
  )
}
