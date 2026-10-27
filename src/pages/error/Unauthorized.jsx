import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ShieldOff, Lock, AlertOctagon } from 'lucide-react'

export default function Unauthorized() {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen bg-bz-black overflow-hidden flex items-center justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Red radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,26,26,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Corner HUD accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-bz-red/40" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-bz-red/40" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-bz-red/40" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-bz-red/40" />

      {/* Scanning line animation */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-bz-red/20 pointer-events-none"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 text-center px-4 max-w-xl mx-auto">
        {/* Shield icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        >
          <div className="relative">
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full bg-bz-red/10 border border-bz-red/30"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ margin: '-12px' }}
            />
            <div className="w-28 h-28 rounded-full bg-bz-surface border-2 border-bz-red/50 flex items-center justify-center shadow-red-glow">
              <ShieldOff className="w-14 h-14 text-bz-red" />
            </div>
          </div>
        </motion.div>

        {/* Status badge */}
        <motion.div
          className="flex justify-center mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 px-4 py-1.5 bg-bz-red/10 border border-bz-red/40 rounded">
            <AlertOctagon className="w-3.5 h-3.5 text-bz-red" />
            <span className="font-mono text-xs text-bz-red tracking-widest uppercase">CLEARANCE LEVEL INSUFFICIENT</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="font-display text-4xl sm:text-6xl font-black text-bz-white tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ textShadow: '0 0 30px rgba(255,26,26,0.3)' }}
        >
          ACCESS <span className="text-bz-red">DENIED</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="flex items-center gap-3 justify-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px w-12 bg-bz-red/50" />
          <Lock className="w-3 h-3 text-bz-red/60" />
          <div className="h-px w-12 bg-bz-red/50" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-sans text-bz-gray text-base sm:text-lg mb-3 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          Unauthorized access to restricted zone.
        </motion.p>

        <motion.p
          className="font-sans text-bz-gray/60 text-sm mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Your clearance level is insufficient for this sector. Contact your commanding officer to request elevated permissions.
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            RETURN TO SAFE ZONE
          </motion.button>
          <motion.button
            onClick={() => navigate(-1)}
            className="btn-outline flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            GO BACK
          </motion.button>
        </motion.div>

        {/* Error code */}
        <motion.p
          className="font-mono text-xs text-bz-gray/30 mt-10 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ERROR_CODE: BZX-403 — ACCESS_DENIED — RESTRICTED_ZONE
        </motion.p>
      </div>
    </div>
  )
}
