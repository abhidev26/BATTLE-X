import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

// Floating particle component
function Particle({ x, y, delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full bg-bz-red/20"
      style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
      animate={{
        y: [-10, 10, -10],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.3, 1],
      }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  size: Math.floor(Math.random() * 6) + 3,
}))

export default function NotFound() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleReturn = () => navigate(user ? '/dashboard' : '/')

  return (
    <div className="relative min-h-screen bg-bz-black overflow-hidden flex items-center justify-center">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Floating particles */}
      {particles.map(p => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Red corner accents */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-bz-red/50" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-bz-red/50" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-bz-red/50" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-bz-red/50" />

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Glitch 404 */}
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className="font-display text-[10rem] sm:text-[14rem] font-black leading-none text-gradient-red select-none animate-glitch"
            style={{ textShadow: '0 0 60px rgba(255,26,26,0.4)' }}
          >
            404
          </h1>
          {/* Glitch duplicate layers */}
          <h1
            className="absolute inset-0 font-display text-[10rem] sm:text-[14rem] font-black leading-none text-bz-red/20 select-none"
            style={{ clipPath: 'inset(30% 0 50% 0)', transform: 'translateX(-4px)' }}
            aria-hidden="true"
          >
            404
          </h1>
          <h1
            className="absolute inset-0 font-display text-[10rem] sm:text-[14rem] font-black leading-none text-cyan-500/20 select-none"
            style={{ clipPath: 'inset(60% 0 20% 0)', transform: 'translateX(4px)' }}
            aria-hidden="true"
          >
            404
          </h1>
        </motion.div>

        {/* Warning icon */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-bz-red/10 border border-bz-red/30 rounded">
            <AlertTriangle className="w-4 h-4 text-bz-red animate-pulse" />
            <span className="font-mono text-xs text-bz-red tracking-widest uppercase">SECTOR ELIMINATED</span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-bz-white tracking-widest mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          ZONE NOT FOUND
        </motion.h2>

        {/* Description */}
        <motion.p
          className="font-sans text-bz-gray text-base sm:text-lg mb-10 max-w-md mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          The sector you're looking for has been eliminated. It may have been destroyed, relocated, or never existed in the first place.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="flex items-center gap-4 mb-10 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-bz-red/50" />
          <div className="w-2 h-2 bg-bz-red rotate-45" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-bz-red/50" />
        </motion.div>

        {/* CTA button */}
        <motion.button
          onClick={handleReturn}
          className="btn-primary flex items-center gap-2 mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Home className="w-4 h-4" />
          RETURN TO BASE
        </motion.button>

        {/* Error code */}
        <motion.p
          className="font-mono text-xs text-bz-gray/40 mt-8 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ERROR_CODE: BZX-404 — ZONE_NOT_FOUND
        </motion.p>
      </div>
    </div>
  )
}
