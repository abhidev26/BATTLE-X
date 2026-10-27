import { Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ShieldOff, Loader2, AlertTriangle, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

// ─── Loading Screen ───────────────────────────────────────────────────────────
function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bz-black gap-6">
      {/* Corner HUD brackets */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-bz-red/20" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-bz-red/20" />
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

      <motion.div
        className="relative flex items-center justify-center w-20 h-20 rounded clip-hex bg-bz-red/10 border border-bz-red/30"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Shield className="w-9 h-9 text-bz-red" />
      </motion.div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-bz-red animate-spin" />
          <span className="font-mono text-sm text-bz-gray tracking-widest animate-pulse">
            AUTHENTICATING...
          </span>
        </div>
        {/* Loading bar */}
        <div className="w-48 h-0.5 bg-bz-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-bz-red shadow-red-glow-sm"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <p className="font-mono text-xs text-bz-gray/40 tracking-wider">
        BATTLEZONE X SECURE ACCESS
      </p>
    </div>
  )
}

// ─── Unauthorized (403) Screen ────────────────────────────────────────────────
function UnauthorizedScreen({ requiredRole }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bz-black px-4 gap-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-bz-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-4 left-4 w-10 h-10 border-t border-l border-bz-red/30" />
      <div className="absolute top-4 right-4 w-10 h-10 border-t border-r border-bz-red/30" />
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b border-l border-bz-red/30" />
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b border-r border-bz-red/30" />

      <motion.div
        className="relative z-10 max-w-md w-full text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Icon */}
        <div className="flex justify-center">
          <motion.div
            className="relative flex items-center justify-center w-24 h-24 rounded clip-hex bg-bz-red/10 border-2 border-bz-red/40 shadow-red-glow"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ShieldOff className="w-11 h-11 text-bz-red" />
          </motion.div>
        </div>

        {/* Error code */}
        <div>
          <div className="font-display text-8xl font-black text-bz-red/20 leading-none select-none pointer-events-none">
            403
          </div>
          <h1 className="font-display text-2xl font-black text-bz-white tracking-wider -mt-4">
            ACCESS DENIED
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-0.5 w-8 bg-bz-red/60" />
            <AlertTriangle className="w-3 h-3 text-bz-red/60" />
            <div className="h-0.5 w-8 bg-bz-red/60" />
          </div>
        </div>

        {/* Message card */}
        <div className="card-glass rounded border border-bz-red/20 p-5 text-left space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-bz-red animate-pulse" />
            <span className="font-mono text-xs text-bz-gray tracking-widest">SECURITY ALERT</span>
          </div>
          <p className="text-sm text-bz-gray leading-relaxed">
            Your operator credentials do not grant access to this restricted zone.
            {requiredRole && (
              <> This area requires <span className="font-mono text-bz-red font-bold"> {requiredRole} </span> clearance level.</>
            )}
          </p>
          <div className="border-t border-bz-border pt-3 space-y-1">
            <p className="font-mono text-xs text-bz-gray/50">INCIDENT LOGGED — {new Date().toISOString()}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.history.back()}
            className="btn-ghost flex-1 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            GO BACK
          </button>
          <a href="/dashboard" className="btn-primary flex-1 flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            DASHBOARD
          </a>
        </div>

        <p className="font-mono text-xs text-bz-gray/30">
          BATTLEZONE X — SECURITY PROTOCOL v4.1
        </p>
      </motion.div>
    </div>
  )
}

// ─── ProtectedRoute ───────────────────────────────────────────────────────────
/**
 * Wraps a route to enforce authentication and optional role-based access.
 *
 * @param {object}   props
 * @param {React.ReactNode} props.children       - The protected page content
 * @param {'ADMIN'|'MODERATOR'} [props.requiredRole] - Optional role requirement
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while auth state initializes
  if (loading) {
    return <AuthLoadingScreen />
  }

  // Not authenticated → redirect to login, preserving intended destination
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  // Role check: if a requiredRole is specified, verify the user has it
  if (requiredRole) {
    const userRoles = user?.roles || []
    const hasRole = userRoles.includes(requiredRole)
    if (!hasRole) {
      return <UnauthorizedScreen requiredRole={requiredRole} />
    }
  }

  // Authenticated (and authorized) — render the protected content
  return children
}
