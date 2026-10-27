import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Shield, Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react'
import { clsx } from 'clsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [fieldError, setFieldError] = useState('')

  const validate = () => {
    if (!email.trim()) return 'Email address is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = validate()
    if (err) { setFieldError(err); return }

    setLoading(true)
    setError('')
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1200))
      setSent(true)
    } catch {
      setError('Unable to send reset link. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bz-black px-4 py-16 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      {/* Red radial glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-bz-red/5 rounded-full blur-3xl pointer-events-none" />
      {/* Corner HUD accents */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-bz-red/30" />
      <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-bz-red/30" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-bz-red/30" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-bz-red/30" />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Brand mark */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-bz-red/10 border border-bz-red/40 rounded clip-hex shadow-red-glow">
            <Shield className="w-6 h-6 text-bz-red" />
          </div>
          <span className="font-display text-2xl font-black tracking-widest text-bz-white">
            BATTLE<span className="text-bz-red">ZONE</span>
          </span>
        </div>

        <div className="card-glass rounded-lg border border-bz-border shadow-card p-8">
          <AnimatePresence mode="wait">
            {/* ── Success State ── */}
            {sent ? (
              <motion.div
                key="success"
                className="text-center py-4 space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Animated success icon */}
                <div className="flex justify-center">
                  <motion.div
                    className="relative w-20 h-20 rounded-full bg-bz-green/10 border-2 border-bz-green flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-10 h-10 text-bz-green" />
                    <div className="absolute inset-0 rounded-full bg-bz-green/10 animate-ping" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className="font-display text-xl font-black text-bz-white tracking-wider">
                    RESET LINK SENT
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-0.5 w-8 bg-bz-green/60" />
                    <div className="h-0.5 w-4 bg-bz-green/30" />
                  </div>
                </div>

                <div className="bg-bz-surface/60 rounded border border-bz-border p-4 text-left space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-bz-red" />
                    <span className="font-mono text-xs text-bz-gray tracking-wider">DELIVERY DETAILS</span>
                  </div>
                  <p className="text-sm text-bz-gray">
                    A password reset link was sent to:
                  </p>
                  <p className="font-mono text-sm text-bz-white break-all">{email}</p>
                  <p className="text-xs text-bz-gray/60 mt-2">
                    Link expires in <span className="text-bz-red font-mono">15 minutes</span>. Check your spam folder if it doesn't arrive.
                  </p>
                </div>

                <Link
                  to="/login"
                  className="btn-primary flex items-center justify-center gap-2 w-full"
                >
                  <ArrowLeft className="w-4 h-4" />
                  BACK TO LOGIN
                </Link>
              </motion.div>
            ) : (
              /* ── Form State ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header */}
                <div className="mb-8">
                  <h2 className="font-display text-2xl font-black text-bz-white tracking-wider mb-2">
                    RECOVER ACCESS
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-0.5 w-12 bg-bz-red shadow-red-glow-sm" />
                    <div className="h-0.5 w-4 bg-bz-red/40" />
                    <div className="h-0.5 w-2 bg-bz-red/20" />
                  </div>
                  <p className="text-sm text-bz-gray leading-relaxed">
                    Enter your registered email address. We'll send you a secure link to reset your operator credentials.
                  </p>
                </div>

                {/* Error banner */}
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

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Email field */}
                  <div>
                    <label className="input-label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bz-gray pointer-events-none" />
                      <input
                        className={clsx(
                          'input w-full pl-9',
                          fieldError && 'border-bz-red/60 focus:border-bz-red'
                        )}
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setFieldError(''); setError('') }}
                        placeholder="operator@battlezone.gg"
                        autoComplete="email"
                        disabled={loading}
                      />
                    </div>
                    <AnimatePresence>
                      {fieldError && (
                        <motion.p
                          className="text-xs text-bz-red mt-1 flex items-center gap-1"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <AlertCircle className="w-3 h-3" /> {fieldError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center gap-2"
                    disabled={loading}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> SENDING LINK...</>
                    ) : (
                      <><Mail className="w-4 h-4" /> SEND RESET LINK</>
                    )}
                  </motion.button>
                </form>

                {/* Security note */}
                <div className="mt-4 p-3 bg-bz-surface/40 rounded border border-bz-border/50 flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-bz-gray flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-bz-gray/60">
                    For security, reset links expire in 15 minutes and can only be used once.
                  </p>
                </div>

                {/* Back to login */}
                <div className="text-center mt-6">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-bz-gray hover:text-bz-red transition-colors font-mono tracking-wide"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    BACK TO LOGIN
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-xs text-bz-gray/40 font-mono mt-4">
          BATTLEZONE X © 2026 — ALL RIGHTS RESERVED
        </p>
      </motion.div>
    </div>
  )
}
