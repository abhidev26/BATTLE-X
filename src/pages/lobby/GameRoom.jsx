import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Check, Play, LogOut, Send, Shield, Users, MapPin } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import { mockPlayer } from '@/utils/mockData'

export default function GameRoom() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isReady, setIsReady] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'SYSTEM', text: 'Room r001 initialized. Safe zone shrinking protocol enabled.', isSystem: true },
    { id: 2, sender: 'VENOM_SHADOW', text: 'Ready up guys!' },
    { id: 3, sender: 'IRON_WOLF', text: 'Going for Crimson Valley north side drop.' },
  ])

  const players = [
    { username: mockPlayer.username, level: mockPlayer.level, ready: isReady, isHost: true },
    { username: 'VENOM_SHADOW', level: 95, ready: true, isHost: false },
    { username: 'IRON_WOLF', level: 91, ready: true, isHost: false },
    { username: 'ABYSS_HUNTER', level: 88, ready: false, isHost: false },
  ]

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    setMessages(prev => [...prev, { id: Date.now(), sender: mockPlayer.username, text: chatInput }])
    setChatInput('')
  }

  return (
    <div className="space-y-6">
      {/* Room Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-bz-border pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="heading-section text-2xl">ROOM: ALPHA SQUAD</h1>
            <Badge variant="gray" className="font-mono">ID: {id || 'r001'}</Badge>
            <Badge variant="red">SQUAD ROYALE</Badge>
          </div>
          <p className="text-muted text-sm mt-1">MAP: CRIMSON VALLEY • HOST: {mockPlayer.username}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="danger" icon={LogOut} onClick={() => navigate('/lobby')}>
            LEAVE ROOM
          </Button>
          <Button
            variant={isReady ? 'primary' : 'outline'}
            className={isReady ? 'bg-bz-green border-bz-green text-black hover:bg-bz-green-dim' : ''}
            onClick={() => setIsReady(!isReady)}
          >
            {isReady ? 'READY ✓' : 'READY UP'}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Player Roster */}
        <div className="lg:col-span-2 space-y-4">
          <Card variant="default" className="p-5">
            <h2 className="font-display font-bold text-base text-bz-white uppercase mb-4 flex items-center justify-between">
              <span>SQUAD OPERATORS ({players.filter(p => p.ready).length}/{players.length} READY)</span>
              <Users className="w-4 h-4 text-bz-gray" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {players.map((p, idx) => (
                <div key={idx} className={`p-4 rounded border flex items-center justify-between ${p.ready ? 'bg-bz-green/5 border-bz-green/40' : 'bg-bz-surface2 border-bz-border'}`}>
                  <div className="flex items-center gap-3">
                    <Avatar username={p.username} size="md" level={p.level} online />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-bz-white">{p.username}</span>
                        {p.isHost && <Crown className="w-4 h-4 text-bz-gold" />}
                      </div>
                      <span className="text-xs text-bz-gray font-mono">LVL {p.level}</span>
                    </div>
                  </div>
                  <Badge variant={p.ready ? 'green' : 'gray'}>
                    {p.ready ? 'READY' : 'WAITING'}
                  </Badge>
                </div>
              ))}
              {/* Empty Slots */}
              {Array.from({ length: 4 - players.length }).map((_, idx) => (
                <div key={idx} className="p-4 rounded border-2 border-dashed border-bz-border flex items-center justify-center text-bz-gray text-xs font-mono">
                  + EMPTY SLOT
                </div>
              ))}
            </div>
          </Card>

          {/* Map Info Card */}
          <Card variant="glass" className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-bz-red" />
              <h3 className="font-display font-bold text-lg text-bz-white">CRIMSON VALLEY PREVIEW</h3>
            </div>
            <p className="text-xs text-bz-gray">
              High-altitude mountainous battleground with 4 major compound drops. Fast shrinking safe zones.
            </p>
          </Card>
        </div>

        {/* Right: Room Chat */}
        <Card variant="default" className="p-5 flex flex-col h-[500px]">
          <h3 className="font-display font-bold text-base text-bz-white uppercase mb-3 pb-2 border-b border-bz-border">
            ROOM COMMS CHAT
          </h3>
          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-2 scrollbar-thin">
            {messages.map(m => (
              <div key={m.id} className={m.isSystem ? 'text-bz-cyan italic bg-bz-cyan/10 p-2 rounded' : 'text-bz-white'}>
                {!m.isSystem && <span className="text-bz-red font-bold mr-1">{m.sender}:</span>}
                <span>{m.text}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendChat} className="mt-4 flex gap-2">
            <input
              type="text"
              className="input text-xs py-2"
              placeholder="Type message..."
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
            />
            <Button type="submit" variant="primary" size="sm" icon={Send} />
          </form>
        </Card>
      </div>
    </div>
  )
}
