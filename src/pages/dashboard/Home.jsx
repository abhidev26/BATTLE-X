import React from 'react'
import { motion } from 'framer-motion'
import { Trophy, Crosshair, Zap, Coins, ArrowRight, Play, Users, Target, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import StatCard from '@/components/ui/StatCard'
import ProgressBar from '@/components/ui/ProgressBar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { mockMatches, mockMissions, mockLeaderboard, mockAchievements } from '@/utils/mockData'

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const player = user || {}
  const stats = player.stats || { wins: 94, kdRatio: 5.92, matches: 287 }

  return (
    <div className="space-y-6">
      {/* Announcement Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-red p-4 flex items-center justify-between border-l-4 border-bz-red"
      >
        <div className="flex items-center gap-3">
          <Badge variant="red">SEASON 5</Badge>
          <p className="text-sm font-medium text-bz-white">
            <span className="text-bz-red font-bold">EVENT ACTIVE:</span> CRIMSON PROTOCOL — Double XP and exclusive cosmetics live now!
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate('/lobby')}>
          JOIN EVENT
        </Button>
      </motion.div>

      {/* Header Welcome */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-bz-border pb-4">
        <div>
          <h1 className="heading-section text-2xl md:text-3xl">
            WELCOME BACK, <span className="text-gradient-red">{player.displayName || player.username || 'OPERATOR'}</span>
          </h1>
          <p className="text-muted text-sm mt-1">COMMAND CENTER ACTIVE • SYSTEM STATUS: OPTIMAL</p>
        </div>
        <Button variant="primary" icon={Play} onClick={() => navigate('/lobby')}>
          ENTER BATTLE LOBBY
        </Button>
      </div>

      {/* Stat Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="TOTAL WINS" value={stats.wins || 94} icon={Trophy} color="gold" change={3} />
        <StatCard label="K/D RATIO" value={stats.kdRatio || 5.92} icon={Crosshair} color="red" change={0.4} />
        <StatCard label="LEVEL" value={player.level || 42} icon={Zap} color="cyan" change={1} />
        <StatCard label="CREDITS" value={player.coins || 4850} icon={Coins} color="gold" />
      </div>

      {/* XP Level Progress */}
      <Card variant="glass" className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Badge variant="red" size="md">LVL {player.level || 42}</Badge>
            <span className="font-display font-bold text-sm tracking-wider text-bz-white">LEVEL PROGRESSION</span>
          </div>
          <span className="font-mono text-xs text-bz-gray">
            {(player.xp || 18450).toLocaleString()} / {(player.xpToNext || 20000).toLocaleString()} XP
          </span>
        </div>
        <ProgressBar value={((player.xp || 18450) / (player.xpToNext || 20000)) * 100} color="red" height="md" animated />
      </Card>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Matches & Missions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Play Panel */}
          <Card variant="default" className="p-6 relative overflow-hidden bg-gradient-to-r from-bz-surface to-bz-red-dark/30 border-bz-red/30">
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <Badge variant="gold" className="mb-2">FEATURED MODE</Badge>
                <h2 className="heading-section text-xl">SOLO BATTLE ROYALE</h2>
                <p className="text-muted text-sm max-w-md mt-1">
                  20 Operators enter the Crimson Valley. 1 Operator survives. Shrinking safe zone combat.
                </p>
              </div>
              <Button variant="primary" size="lg" icon={Play} className="w-full sm:w-auto shadow-red-glow" onClick={() => navigate('/lobby')}>
                DEPLY NOW
              </Button>
            </div>
          </Card>

          {/* Recent Matches */}
          <Card variant="default" className="p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-bz-border">
              <h3 className="font-display font-bold text-lg text-bz-white uppercase">RECENT MATCH COMBAT LOG</h3>
              <Button variant="ghost" size="sm" icon={ArrowRight} onClick={() => navigate('/matches')}>
                VIEW ALL
              </Button>
            </div>
            <div className="space-y-3">
              {mockMatches.slice(0, 4).map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-bz-surface2 rounded border border-bz-border/50 hover:border-bz-red/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-10 rounded-full ${match.result === 'WIN' ? 'bg-bz-green' : 'bg-bz-red'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-bz-white">{match.mode}</span>
                        <Badge variant="gray">{match.map}</Badge>
                      </div>
                      <span className="text-xs text-bz-gray font-mono">{match.date} • {match.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 font-mono text-sm">
                    <div className="text-right">
                      <span className="text-bz-gray text-xs block">RANK</span>
                      <span className={match.placement === 1 ? 'text-bz-gold font-bold' : 'text-bz-white'}>#{match.placement}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-bz-gray text-xs block">KILLS</span>
                      <span className="text-bz-red font-bold">{match.kills}</span>
                    </div>
                    <Badge variant={match.result === 'WIN' ? 'green' : 'red'}>{match.result}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Missions */}
          <Card variant="default" className="p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-bz-border">
              <h3 className="font-display font-bold text-lg text-bz-white uppercase">ACTIVE OPERATOR MISSIONS</h3>
              <Badge variant="red">RESET IN 14H</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockMissions.map((m) => (
                <div key={m.id} className="p-3 bg-bz-surface2 rounded border border-bz-border space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-xs text-bz-white">{m.name}</span>
                    <Badge variant={m.type === 'DAILY' ? 'cyan' : 'gold'}>{m.type}</Badge>
                  </div>
                  <p className="text-xs text-bz-gray">{m.description}</p>
                  <ProgressBar value={(m.progress / m.total) * 100} color={m.type === 'DAILY' ? 'cyan' : 'gold'} height="sm" />
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-bz-gray">{m.progress}/{m.total}</span>
                    <span className="text-bz-gold">+{m.reward} CREDITS</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Leaderboard & Achievements */}
        <div className="space-y-6">
          {/* Top Leaderboard Snippet */}
          <Card variant="default" className="p-5">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-bz-border">
              <h3 className="font-display font-bold text-base text-bz-white uppercase">TOP OPERATORS</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/leaderboard')}>ALL</Button>
            </div>
            <div className="space-y-3">
              {mockLeaderboard.slice(0, 4).map((op) => (
                <div key={op.rank} className={`flex items-center justify-between p-2.5 rounded ${op.isCurrentPlayer ? 'bg-bz-red/10 border border-bz-red/40' : 'bg-bz-surface2'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold text-sm w-6 text-center ${op.rank === 1 ? 'text-bz-gold' : op.rank === 2 ? 'text-gray-300' : 'text-amber-600'}`}>
                      #{op.rank}
                    </span>
                    <div>
                      <span className="font-display font-bold text-xs text-bz-white block">{op.username}</span>
                      <span className="text-[10px] text-bz-gray font-mono">LVL {op.level} • {op.kills} KILLS</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-xs text-bz-red">{op.kd} K/D</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Featured Achievement */}
          <Card variant="glass" className="p-5">
            <h3 className="font-display font-bold text-base text-bz-white uppercase mb-3">LATEST UNLOCKED</h3>
            {mockAchievements.filter(a => a.unlocked)[0] && (
              <div className="flex items-center gap-4 bg-bz-surface2 p-3 rounded border border-bz-gold/30">
                <span className="text-3xl">{mockAchievements.filter(a => a.unlocked)[0].icon}</span>
                <div>
                  <h4 className="font-display font-bold text-sm text-bz-gold">{mockAchievements.filter(a => a.unlocked)[0].name}</h4>
                  <p className="text-xs text-bz-gray mt-0.5">{mockAchievements.filter(a => a.unlocked)[0].description}</p>
                  <span className="text-[10px] font-mono text-bz-green block mt-1">+{mockAchievements.filter(a => a.unlocked)[0].xpReward} XP REWARD</span>
                </div>
              </div>
            )}
          </Card>

          {/* Platform Status Card */}
          <Card variant="default" className="p-5 space-y-3">
            <h3 className="font-display font-bold text-base text-bz-white uppercase">SYSTEM TELEMETRY</h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-bz-gray">
                <span>ONLINE PLAYERS:</span>
                <span className="text-bz-green font-bold">3,847</span>
              </div>
              <div className="flex justify-between text-bz-gray">
                <span>ACTIVE MATCHES:</span>
                <span className="text-bz-white font-bold">412</span>
              </div>
              <div className="flex justify-between text-bz-gray">
                <span>SERVER PING:</span>
                <span className="text-bz-green font-bold">24 ms</span>
              </div>
              <div className="flex justify-between text-bz-gray">
                <span>REGION:</span>
                <span className="text-bz-cyan font-bold">NORTH AMERICA (EAST)</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
