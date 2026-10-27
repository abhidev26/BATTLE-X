import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Check, X, RefreshCw, Radio } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'

export default function Matchmaking() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)
  const [statusText, setStatusText] = useState('SCANNING SERVERS...')
  const [matchFound, setMatchFound] = useState(false)
  const [ready, setReady] = useState(false)
  const [countdown, setCountdown] = useState(15)

  useEffect(() => {
    if (matchFound) return
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [matchFound])

  useEffect(() => {
    if (seconds === 2) setStatusText('ANALYZING SKILL RATING...')
    if (seconds === 4) setStatusText('MATCHING OPERATORS...')
    if (seconds === 6 && !matchFound) {
      setMatchFound(true)
    }
  }, [seconds, matchFound])

  useEffect(() => {
    if (!matchFound) return
    const cd = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(cd)
          navigate('/room/r001')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(cd)
  }, [matchFound, navigate])

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0')
    const secs = (totalSeconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center relative overflow-hidden bg-grid">
      {/* Background Animated Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-96 h-96 rounded-full border border-bz-red/30"
        />
        <motion.div
          animate={{ scale: [1, 2.4, 1], opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[500px] h-[500px] rounded-full border border-bz-red/20"
        />
      </div>

      {!matchFound ? (
        <Card variant="glass" className="w-full max-w-lg p-8 text-center space-y-6 relative z-10 border-bz-red/40 shadow-red-glow">
          <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-bz-red"
            />
            <Radio className="w-12 h-12 text-bz-red animate-pulse" />
          </div>

          <div>
            <Badge variant="red" className="mb-2">TACTICAL MATCHMAKING</Badge>
            <h1 className="heading-section text-2xl">FINDING MATCH</h1>
            <p className="text-bz-gray font-mono text-sm mt-1">{statusText}</p>
          </div>

          <div className="p-4 bg-bz-surface2/80 rounded border border-bz-border font-mono">
            <span className="text-xs text-bz-gray block mb-1">ELAPSED TIME</span>
            <span className="text-3xl font-bold text-bz-white tracking-widest">{formatTime(seconds)}</span>
          </div>

          <div className="flex justify-between text-xs font-mono text-bz-gray px-4">
            <span>MODE: SOLO BATTLE</span>
            <span>PING: ~24 ms</span>
          </div>

          <Button variant="danger" className="w-full" icon={X} onClick={() => navigate('/lobby')}>
            CANCEL SEARCH
          </Button>
        </Card>
      ) : (
        <Card variant="default" className="w-full max-w-lg p-8 text-center space-y-6 relative z-10 border-bz-green/50 bg-bz-surface shadow-[0_0_30px_rgba(0,255,136,0.2)]">
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-bz-green/20 border-2 border-bz-green flex items-center justify-center text-bz-green">
              <Check className="w-10 h-10" />
            </div>

            <div>
              <Badge variant="green" size="md">MATCH FOUND!</Badge>
              <h2 className="heading-section text-2xl text-bz-white mt-2">CRIMSON VALLEY</h2>
              <p className="text-bz-gray font-mono text-xs mt-1">SOLO BATTLE ROYALE • 20 OPERATORS</p>
            </div>

            <div className="p-4 bg-bz-surface2 rounded border border-bz-border font-mono space-y-1">
              <span className="text-xs text-bz-gray block">AUTO-START IN</span>
              <span className="text-4xl font-bold text-bz-gold">{countdown}s</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={ready ? 'primary' : 'outline'}
                className={ready ? 'bg-bz-green border-bz-green text-black hover:bg-bz-green-dim' : ''}
                onClick={() => {
                  setReady(true)
                  setTimeout(() => navigate('/room/r001'), 1500)
                }}
              >
                {ready ? 'READY ✓' : 'ACCEPT MATCH'}
              </Button>
              <Button variant="danger" icon={X} onClick={() => navigate('/lobby')}>
                DECLINE
              </Button>
            </div>
          </motion.div>
        </Card>
      )}
    </div>
  )
}
