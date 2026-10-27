import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Shield, Bell, Monitor, Gamepad2, Lock, Save } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useAuth } from '@/context/AuthContext'

export default function Settings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('ACCOUNT')
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    username: user?.username || 'GHOST_REAPER',
    email: user?.email || 'ghost@bz.gg',
    displayName: user?.displayName || 'Ghost Reaper',
    soundFx: true,
    music: true,
    showPing: true,
    autoReady: false,
    region: 'US_EAST',
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs = [
    { id: 'ACCOUNT', label: 'ACCOUNT', icon: User },
    { id: 'SECURITY', label: 'SECURITY', icon: Lock },
    { id: 'GAME', label: 'GAMEPLAY', icon: Gamepad2 },
    { id: 'AUDIO', label: 'DISPLAY & AUDIO', icon: Monitor },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-bz-border pb-4">
        <div>
          <h1 className="heading-section text-2xl">SYSTEM SETTINGS</h1>
          <p className="text-muted text-sm mt-1">OPERATOR PREFERENCES & CONFIGURATION</p>
        </div>
        {saved && (
          <Badge variant="green" className="animate-pulse">
            SETTINGS SAVED LOCALLY ✓
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Nav Tabs */}
        <div className="space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-display font-bold transition-all ${
                  isActive ? 'bg-bz-red text-white shadow-red-glow-sm' : 'bg-bz-surface hover:bg-bz-surface2 text-bz-gray hover:text-bz-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Form */}
        <Card variant="default" className="md:col-span-3 p-6">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'ACCOUNT' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-bz-white border-b border-bz-border pb-2">ACCOUNT DETAILS</h3>
                <div>
                  <label className="input-label">USERNAME</label>
                  <input
                    type="text"
                    className="input"
                    value={form.username}
                    onChange={e => setForm({ ...form, username: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">DISPLAY NAME</label>
                  <input
                    type="text"
                    className="input"
                    value={form.displayName}
                    onChange={e => setForm({ ...form, displayName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="input-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>
            )}

            {activeTab === 'SECURITY' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-bz-white border-b border-bz-border pb-2">SECURITY & PASSWORD</h3>
                <div>
                  <label className="input-label">CURRENT PASSWORD</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div>
                  <label className="input-label">NEW PASSWORD</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
                <div>
                  <label className="input-label">CONFIRM NEW PASSWORD</label>
                  <input type="password" className="input" placeholder="••••••••" />
                </div>
              </div>
            )}

            {activeTab === 'GAME' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-bz-white border-b border-bz-border pb-2">GAMEPLAY PREFERENCES</h3>
                <div className="flex items-center justify-between p-3 bg-bz-surface2 rounded">
                  <span className="text-sm font-medium text-bz-white">AUTO-READY IN LOBBY</span>
                  <input
                    type="checkbox"
                    className="accent-bz-red w-4 h-4"
                    checked={form.autoReady}
                    onChange={e => setForm({ ...form, autoReady: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bz-surface2 rounded">
                  <span className="text-sm font-medium text-bz-white">DISPLAY SERVER PING</span>
                  <input
                    type="checkbox"
                    className="accent-bz-red w-4 h-4"
                    checked={form.showPing}
                    onChange={e => setForm({ ...form, showPing: e.target.checked })}
                  />
                </div>
                <div>
                  <label className="input-label">PREFERRED REGION</label>
                  <select
                    className="input bg-bz-surface2"
                    value={form.region}
                    onChange={e => setForm({ ...form, region: e.target.value })}
                  >
                    <option value="US_EAST">NORTH AMERICA (EAST)</option>
                    <option value="US_WEST">NORTH AMERICA (WEST)</option>
                    <option value="EU_CENTRAL">EUROPE (CENTRAL)</option>
                    <option value="ASIA_SOUTH">ASIA (SOUTH)</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'AUDIO' && (
              <div className="space-y-4">
                <h3 className="font-display font-bold text-lg text-bz-white border-b border-bz-border pb-2">AUDIO & VISUALS</h3>
                <div className="flex items-center justify-between p-3 bg-bz-surface2 rounded">
                  <span className="text-sm font-medium text-bz-white">SOUND EFFECTS</span>
                  <input
                    type="checkbox"
                    className="accent-bz-red w-4 h-4"
                    checked={form.soundFx}
                    onChange={e => setForm({ ...form, soundFx: e.target.checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-bz-surface2 rounded">
                  <span className="text-sm font-medium text-bz-white">BACKGROUND MUSIC</span>
                  <input
                    type="checkbox"
                    className="accent-bz-red w-4 h-4"
                    checked={form.music}
                    onChange={e => setForm({ ...form, music: e.target.checked })}
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-bz-border flex justify-end">
              <Button type="submit" variant="primary" icon={Save}>
                SAVE PREFERENCES
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
