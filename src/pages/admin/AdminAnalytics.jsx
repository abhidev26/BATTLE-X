import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Award, Activity } from 'lucide-react'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { mockAdminStats } from '@/utils/mockData'

export default function AdminAnalytics() {
  const chartData = mockAdminStats.dailyActivePlayers.labels.map((label, idx) => ({
    day: label,
    active: mockAdminStats.dailyActivePlayers.data[idx],
    matches: mockAdminStats.matchesPerDay.data[idx],
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-bz-border pb-4">
        <div>
          <h1 className="heading-section text-2xl">PLATFORM ANALYTICS</h1>
          <p className="text-muted text-sm mt-1">TELEMETRY & USER ENGAGEMENT METRICS</p>
        </div>
        <Badge variant="cyan">REAL-TIME FEED</Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="AVG SESSION DURATION" value="42m" icon={Clock} color="red" />
        <StatCard label="D7 RETENTION RATE" value="34%" icon={TrendingUp} color="green" change={2.1} />
        <StatCard label="MATCH COMPLETION RATE" value="98.4%" icon={Activity} color="cyan" />
        <StatCard label="REVENUE PER USER" value="$2.95" icon={Award} color="gold" change={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card variant="default" className="p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-bz-white uppercase">DAILY ACTIVE OPERATORS</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff1a1a" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ff1a1a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Area type="monotone" dataKey="active" stroke="#ff1a1a" fillOpacity={1} fill="url(#activeGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card variant="default" className="p-5 space-y-4">
          <h3 className="font-display font-bold text-base text-bz-white uppercase">TOTAL MATCHES PLAYED</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} />
                <Bar dataKey="matches" fill="#00d4ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  )
}
