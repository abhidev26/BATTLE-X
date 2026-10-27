import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Ban, Eye, MoreVertical, ShieldAlert } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Modal from '@/components/ui/Modal'
import { mockUsers } from '@/utils/mockData'

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('ALL')
  const [suspendModalUser, setSuspendModalUser] = useState(null)
  const [suspendReason, setSuspendReason] = useState('')

  const filteredUsers = mockUsers.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === 'ALL' || u.role === selectedRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-bz-border pb-4">
        <div>
          <h1 className="heading-section text-2xl">OPERATOR MANAGEMENT</h1>
          <p className="text-muted text-sm mt-1">INSPECT, SUSPEND, AND MANAGE PLAYER ACCOUNTS</p>
        </div>
        <Badge variant="red" size="md">TOTAL USERS: {mockUsers.length}</Badge>
      </div>

      {/* Filter Bar */}
      <Card variant="default" className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-bz-gray" />
          <input
            type="text"
            className="input pl-9 text-xs"
            placeholder="Search username or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-bz-gray" />
          <select
            className="input text-xs bg-bz-surface2 w-full sm:w-48"
            value={selectedRole}
            onChange={e => setSelectedRole(e.target.value)}
          >
            <option value="ALL">ALL ROLES</option>
            <option value="PLAYER">PLAYER</option>
            <option value="MODERATOR">MODERATOR</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
      </Card>

      {/* Users Table */}
      <Card variant="default" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-bz-surface2 text-bz-gray border-b border-bz-border">
              <tr>
                <th className="p-4">OPERATOR</th>
                <th className="p-4">EMAIL</th>
                <th className="p-4">LEVEL</th>
                <th className="p-4">STATUS</th>
                <th className="p-4">ROLE</th>
                <th className="p-4">JOINED</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bz-border">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-bz-surface2/50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <Avatar username={user.username} size="sm" />
                    <span className="font-display font-bold text-sm text-bz-white">{user.username}</span>
                  </td>
                  <td className="p-4 text-bz-gray">{user.email}</td>
                  <td className="p-4 font-bold text-bz-gold">LVL {user.level}</td>
                  <td className="p-4">
                    <Badge variant={user.status === 'ONLINE' ? 'green' : user.status === 'IN_MATCH' ? 'gold' : 'gray'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={user.role === 'ADMIN' ? 'red' : user.role === 'MODERATOR' ? 'cyan' : 'gray'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-bz-gray">{user.joined}</td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="ghost" size="sm" icon={Ban} className="hover:text-bz-red" onClick={() => setSuspendModalUser(user)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Suspend Modal */}
      <Modal isOpen={!!suspendModalUser} onClose={() => setSuspendModalUser(null)} title={`SUSPEND ${suspendModalUser?.username}`}>
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3 p-3 bg-bz-red/10 border border-bz-red/30 rounded text-bz-red text-xs">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <p>Suspending this operator will temporarily or permanently revoke match queue privileges.</p>
          </div>
          <div>
            <label className="input-label">SUSPENSION REASON</label>
            <textarea
              className="input h-24 text-xs resize-none"
              placeholder="Provide reason for moderation log..."
              value={suspendReason}
              onChange={e => setSuspendReason(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setSuspendModalUser(null)}>CANCEL</Button>
            <Button variant="danger" onClick={() => { setSuspendModalUser(null); setSuspendReason(''); }}>
              CONFIRM SUSPENSION
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
