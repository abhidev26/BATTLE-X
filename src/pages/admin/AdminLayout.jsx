import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart2, Users, Gamepad2, Sword, Flag, Megaphone,
  TrendingUp, Settings, ShieldAlert, ChevronLeft, Menu, X,
  Zap, Bell, LogOut, Home,
} from 'lucide-react'
import { clsx } from 'clsx'

const adminNavItems = [
  { label: 'OVERVIEW',      icon: BarChart2,  path: '/admin' },
  { label: 'USERS',         icon: Users,      path: '/admin/users' },
  { label: 'MATCHES',       icon: Gamepad2,   path: '/admin/matches' },
  { label: 'WEAPONS',       icon: Sword,      path: '/admin/weapons' },
  { label: 'REPORTS',       icon: Flag,       path: '/admin/reports', badge: 23 },
  { label: 'ANNOUNCEMENTS', icon: Megaphone,  path: '/admin/announcements' },
  { label: 'ANALYTICS',     icon: TrendingUp, path: '/admin/analytics' },
  { label: 'SETTINGS',      icon: Settings,   path: '/admin/settings' },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-bz-black overflow-hidden">
      {/* ── Sidebar ───────────────────────────────────────────── */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="relative flex flex-col bg-bz-surface border-r border-bz-border overflow-hidden shrink-0 z-20"
      >
        {/* Logo row */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-bz-border shrink-0">
          <div className="w-8 h-8 bg-bz-red flex items-center justify-center shrink-0 clip-hex shadow-red-glow-sm">
            <Zap size={16} className="text-white" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="font-display text-xs text-bz-red font-bold tracking-widest whitespace-nowrap"
              >
                BZX ADMIN
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            className="ml-auto text-bz-gray hover:text-bz-white transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto overflow-x-hidden">
          {adminNavItems.map(({ label, icon: Icon, path, badge }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/admin'}
              className={({ isActive }) =>
                clsx(
                  'flex items-center gap-3 px-4 py-2.5 mx-2 rounded transition-all duration-150 relative group',
                  isActive
                    ? 'bg-bz-red/10 text-bz-red border border-bz-red/30'
                    : 'text-bz-gray hover:text-bz-white hover:bg-white/[0.03]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={16} className="shrink-0" />
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="font-display text-[10px] tracking-widest whitespace-nowrap font-bold"
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {badge && sidebarOpen && (
                    <span className="ml-auto badge-red text-[9px] px-1.5 py-0.5">
                      {badge}
                    </span>
                  )}
                  {badge && !sidebarOpen && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-bz-red animate-pulse-red" />
                  )}
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-bz-red rounded-r" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-bz-border p-3 space-y-1">
          <button
            onClick={() => navigate('/')}
            className={clsx(
              'flex items-center gap-3 w-full px-3 py-2 rounded text-bz-gray hover:text-bz-white hover:bg-white/[0.03] transition-colors',
            )}
          >
            <Home size={16} className="shrink-0" />
            {sidebarOpen && (
              <span className="font-display text-[10px] tracking-widest">PLAYER VIEW</span>
            )}
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded text-bz-gray hover:text-bz-red hover:bg-bz-red/10 transition-colors">
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && (
              <span className="font-display text-[10px] tracking-widest">LOGOUT</span>
            )}
          </button>
        </div>
      </motion.aside>

      {/* ── Main content ──────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin top banner */}
        <header className="shrink-0 bg-bz-surface border-b border-bz-red/40 shadow-red-glow-sm">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-3">
              <ShieldAlert size={18} className="text-bz-red animate-pulse-red" />
              <span className="font-display text-sm font-bold tracking-widest text-bz-red">
                ADMIN COMMAND CENTER
              </span>
              <span className="badge-red text-[9px] px-2 py-0.5 ml-1">RESTRICTED</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Warning notice */}
              <div className="hidden md:flex items-center gap-2 border border-bz-red/30 bg-bz-red/5 px-3 py-1.5 rounded text-xs text-bz-red/80 font-mono">
                <ShieldAlert size={12} />
                <span>All actions are logged and audited</span>
              </div>
              <button className="relative text-bz-gray hover:text-bz-white transition-colors">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-bz-red" />
              </button>
              <div className="w-8 h-8 rounded bg-bz-red/20 border border-bz-red/40 flex items-center justify-center">
                <span className="font-display text-[10px] text-bz-red font-bold">ADM</span>
              </div>
            </div>
          </div>
          {/* Red accent line */}
          <div className="h-[2px] bg-gradient-to-r from-bz-red via-bz-red/60 to-transparent" />
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-bz-black">
          <div className="bg-grid min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
