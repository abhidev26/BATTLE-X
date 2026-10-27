import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Flag, CheckCircle, AlertTriangle, Shield, XCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export default function AdminReports() {
  const [filter, setFilter] = useState('OPEN')
  const [reports, setReports] = useState([
    { id: 'rep1', target: 'TOXIC_PLAYER', reporter: 'GHOST_REAPER', reason: 'HARASSMENT / VOICE CHAT', date: '12m ago', status: 'OPEN' },
    { id: 'rep2', target: 'SPEED_HACKER', reporter: 'IRON_WOLF', reason: 'SUSPECTED CHEATING / MOVEMENT', date: '45m ago', status: 'OPEN' },
    { id: 'rep3', target: 'AFK_BOT', reporter: 'VENOM_SHADOW', reason: 'INACTIVE IN MATCH', date: '2h ago', status: 'RESOLVED' },
  ])

  const handleResolve = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'RESOLVED' } : r))
  }

  const handleDismiss = (id) => {
    setReports(prev => prev.filter(r => r.id !== id))
  }

  const filtered = reports.filter(r => filter === 'ALL' || r.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-bz-border pb-4">
        <div>
          <h1 className="heading-section text-2xl">PLAYER REPORTS</h1>
          <p className="text-muted text-sm mt-1">REVIEW AND MODERATE USER INCIDENT REPORTS</p>
        </div>
        <div className="flex gap-2">
          {['OPEN', 'RESOLVED', 'ALL'].map(f => (
            <Button
              key={f}
              variant={filter === f ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(r => (
          <Card key={r.id} variant="default" className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-bz-red">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <Badge variant="red">{r.reason}</Badge>
                <span className="font-mono text-xs text-bz-gray">{r.date}</span>
              </div>
              <p className="text-sm font-display font-bold text-bz-white">
                REPORTED OPERATOR: <span className="text-bz-red">{r.target}</span>
              </p>
              <p className="text-xs text-bz-gray font-mono">FILED BY: {r.reporter}</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              {r.status === 'OPEN' ? (
                <>
                  <Button variant="danger" size="sm" icon={Shield} onClick={() => handleResolve(r.id)}>
                    SUSPEND & RESOLVE
                  </Button>
                  <Button variant="ghost" size="sm" icon={XCircle} onClick={() => handleDismiss(r.id)}>
                    DISMISS
                  </Button>
                </>
              ) : (
                <Badge variant="green" icon={CheckCircle}>RESOLVED</Badge>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
