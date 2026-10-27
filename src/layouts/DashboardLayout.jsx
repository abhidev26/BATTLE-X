import { useState, useRef, useEffect } from 'react'
import { Outlet, useLocation, useNavigate, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home, Gamepad2, Calendar, Package, Trophy, Star, User, Settings,
  Shield, Coins, LogOut, Bell, Search, Menu, X, ChevronRight,
  Zap, Gift, AlertCircle, CheckCircle, Info, ArrowRight,
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAuth } from '@/context/AuthContext'
import { useNotifications } from '@/context/NotificationContext'
import Avatar from '@/components/ui/Avatar'

// ─── Nav config ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: 'HOME',         icon: Home,     path: '/dashboard' },
  { label: 'PLAY',         icon: Gamepad2, path: '/lobby' },
  { label: 'MATCHES',      icon: Calendar, path: '/matches' },
  { label: 'INVENTORY',    icon: Package,  path: '/inventory' },
  { label: 'LEADERBOARD',  icon: Trophy,   path: '/leaderboard' },
  { label: 'ACHIEVEMENTS', icon: Star,     path: '/achievements' },
  { label: 'PROFILE',      icon: User,     path: '/profile' },
  { label: 'SETTINGS',     icon: Settings, path: '/settings' },
]

const ADMIN_ITEMS = [
  { label: 'ADMIN PANEL', icon: Shield, path: '/admin' },
]

// ─── Notification icon map ────────────────────────────────────────────────────
const notifIcon = {
  LEVEL_UP:     <Zap size={14} className="text-cyan-400" />,
  ACHIEVEMENT:  <Star size={14} className="text-bz-gold" />,
  MATCH_FOUND:  <Gamepad2 size={14} className="text-bz-red" />,
  REWARD:       <Gift size={14} className="text-bz-green" />,
  SYSTEM:       <AlertCircle size={14} className="text-bz-gray" />,
}

// ─── Single nav link (used in both sidebar & mobile drawer) ──────────────────
function SideNavItem({ item, collapsed, onClick }) {
  const location = useLocation()
  const isActive = location.pathname === item.path ||
    (item.path !== '/dashboard' && location.pathname.startsWith(item.path))

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={clsx(
        'group relative flex items-center gap-3 px-3 py-2.5 rounded-sm transition-all duration-200',
        collapsed ? 'justify-center' : '',
        isActive
          ? 'text-bz-red bg-bz-red/10 border-l-2 border-bz-red'
          : 'text-bz-gray hover:text-bz-white hover:bg-bz-surface2 border-l-2 border-transparent'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <item.icon
        size={16}
        className={clsx('flex-shrink-0 transition-colors', isActive ? 'text-bz-red' : 'text-bz-gray group-hover:text-bz-white')}
        aria-hidden="true"
      />
      {!collapsed && (
        <span className="text-xs font-display font-bold tracking-widest uppercase leading-none">
          {item.label}
        </span>
      )}
      {/* Active glow dot */}
      {isActive && !collapsed && (
        <ChevronRight size={12} className="ml-auto text-bz-red opacity-60" aria-hidden="true" />
      )}
      {/* Tooltip for collapsed mode */}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 bg-bz-surface border border-bz-border text-bz-white text-xs font-display tracking-wider uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
          {item.label}
        </span>
      )}
    </NavLink>
  )
}

// ─── Notification dropdown ────────────────────────────────────────────────────
function NotificationDropdown({ onClose }) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()
  const navigate = useNavigate()
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute right-0 top-full mt-2 w-80 bg-bz-surface border border-bz-border rounded-sm shadow-card z-50 overflow-hidden"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-bz-border">
        <div className="flex items-center gap-2">
          <span className="font-display text-xs font-bold tracking-widest uppercase text-bz-white">
            NOTIFICATIONS
          </span>
          {unreadCount > 0 && (
            <span className="badge-red text-[10px] py-0.5">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-[10px] font-mono text-bz-gray hover:text-bz-red transition-colors uppercase tracking-wider"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="max-h-72 overflow-y-auto scrollbar-thin">
        {notifications.slice(0, 5).map((n) => (
          <button
            key={n.id}
            onClick={() => markRead(n.id)}
            className={clsx(
              'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-bz-surface2',
              !n.read && 'bg-bz-red/[0.03]'
            )}
          >
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              {notifIcon[n.type] ?? <Info size={14} className="text-bz-gray" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className={clsx('text-xs leading-snug', n.read ? 'text-bz-gray' : 'text-bz-white')}>
                {n.message}
              </p>
              <p className="text-[10px] text-bz-gray/60 font-mono mt-1">{n.time}</p>
            </div>
            {!n.read && (
              <div className="w-2 h-2 rounded-full bg-bz-red flex-shrink-0 mt-1.5 shadow-red-glow-sm" aria-hidden="true" />
            )}
          </button>
        ))}
        {notifications.length === 0 && (
          <div className="px-4 py-8 text-center text-bz-gray text-xs">
            No notifications
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-bz-border px-4 py-2.5">
        <button
          onClick={() => { navigate('/notifications'); onClose() }}
          className="w-full flex items-center justify-center gap-1.5 text-[11px] font-display tracking-widest uppercase text-bz-red hover:text-bz-white transition-colors py-1"
        >
          VIEW ALL <ArrowRight size={11} />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Sidebar content (reused for desktop + drawer) ───────────────────────────
function SidebarContent({ collapsed = false, onNavClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Player info */}
      <div className={clsx(
        'flex items-center border-b border-bz-border',
        collapsed ? 'justify-center p-3' : 'gap-3 p-4'
      )}>
        <Avatar
          username={user?.username || 'GHOST_REAPER'}
          size={collapsed ? 'sm' : 'md'}
          online
          level={collapsed ? undefined : user?.level}
          src={user?.avatar}
        />
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs font-bold text-bz-white tracking-wider truncate">
              {user?.username || 'GHOST_REAPER'}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="online-dot w-1.5 h-1.5" aria-hidden="true" />
              <span className="text-bz-green text-[10px] font-mono">ONLINE</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="badge-red text-[9px] py-0 px-1.5">LVL {user?.level || 42}</span>
              {user?.premium && (
                <span className="badge-gold text-[9px] py-0 px-1.5">PRO</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-0.5" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => (
          <SideNavItem key={item.path} item={item} collapsed={collapsed} onClick={onNavClick} />
        ))}

        {/* Admin section */}
        {user?.role === 'ADMIN' && (
          <>
            <div className={clsx('my-2 border-t border-bz-border', collapsed ? 'mx-1' : 'mx-0')} />
            <p className={clsx('text-[9px] font-display text-bz-gray/50 uppercase tracking-widest px-3 mb-1', collapsed && 'hidden')}>
              ADMIN
            </p>
            {ADMIN_ITEMS.map((item) => (
              <SideNavItem key={item.path} item={item} collapsed={collapsed} onClick={onNavClick} />
            ))}
          </>
        )}
      </nav>

      {/* Bottom: coins + logout */}
      <div className={clsx('border-t border-bz-border p-3 space-y-2', collapsed && 'flex flex-col items-center')}>
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 py-2 bg-bz-surface2 rounded-sm border border-bz-border">
            <Coins size={14} className="text-bz-gold flex-shrink-0" aria-hidden="true" />
            <span className="font-mono text-bz-gold font-bold text-sm">
              {(user?.coins || 4850).toLocaleString()}
            </span>
            <span className="text-[10px] text-bz-gray uppercase font-display ml-auto tracking-wider">COINS</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 flex items-center justify-center bg-bz-surface2 rounded-sm border border-bz-border">
            <Coins size={14} className="text-bz-gold" aria-hidden="true" />
          </div>
        )}
        <button
          onClick={handleLogout}
          className={clsx(
            'w-full flex items-center gap-2 px-3 py-2 rounded-sm text-xs font-display font-bold uppercase tracking-widest',
            'text-bz-gray border border-transparent hover:text-red-400 hover:border-red-900/50 hover:bg-red-950/30',
            'transition-all duration-200',
            collapsed && 'justify-center'
          )}
          aria-label="Logout"
        >
          <LogOut size={14} aria-hidden="true" />
          {!collapsed && 'LOGOUT'}
        </button>
      </div>
    </div>
  )
}

// ─── Main layout ─────────────────────────────────────────────────────────────
export default function DashboardLayout() {
  const location = useLocation()
  const { user } = useAuth()
  const { unreadCount, notifications } = useNotifications()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Derive page title from path
  const pageTitle = (() => {
    const seg = location.pathname.split('/').filter(Boolean).pop()?.toUpperCase()
    if (!seg || seg === 'DASHBOARD') return 'COMMAND CENTER'
    return seg
  })()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileDrawerOpen(false)
  }, [location.pathname])

  return (
    <div className="flex h-screen bg-bz-black overflow-hidden">

      {/* ── Desktop Sidebar ── */}
      <aside
        className={clsx(
          'hidden md:flex flex-col flex-shrink-0 bg-bz-surface border-r border-bz-border transition-all duration-300 z-30',
          sidebarCollapsed ? 'w-14' : 'w-60'
        )}
        aria-label="Sidebar"
      >
        {/* Sidebar top bar with logo / collapse */}
        <div className={clsx(
          'flex items-center border-b border-bz-border h-14 flex-shrink-0',
          sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}>
          {!sidebarCollapsed && (
            <span className="font-display text-xs font-black tracking-widest text-bz-red uppercase">
              BZ<span className="text-bz-white">X</span>
            </span>
          )}
          <button
            onClick={() => setSidebarCollapsed((v) => !v)}
            className="w-7 h-7 flex items-center justify-center rounded-sm text-bz-gray hover:text-bz-white hover:bg-bz-surface2 transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Menu size={14} aria-hidden="true" />
          </button>
        </div>

        <SidebarContent collapsed={sidebarCollapsed} />
      </aside>

      {/* ── Mobile Drawer overlay ── */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileDrawerOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-bz-surface border-r border-bz-border z-50 flex flex-col md:hidden"
              aria-label="Mobile navigation"
            >
              {/* Mobile drawer header */}
              <div className="flex items-center justify-between px-4 h-14 border-b border-bz-border flex-shrink-0">
                <span className="font-display text-sm font-black tracking-widest text-bz-red uppercase">
                  BATTLEZONE <span className="text-bz-white">X</span>
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-sm text-bz-gray hover:text-bz-white hover:bg-bz-surface2 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <SidebarContent onNavClick={() => setMobileDrawerOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main area (header + content) ── */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* ── Top Header Bar ── */}
        <header className="flex items-center h-14 px-4 gap-3 bg-bz-black/80 backdrop-blur-sm border-b border-bz-border flex-shrink-0 z-20">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-sm text-bz-gray hover:text-bz-white hover:bg-bz-surface2 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={16} aria-hidden="true" />
          </button>

          {/* Left: Brand / Page title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="hidden md:flex items-center gap-2">
              <span className="font-display text-[10px] font-bold tracking-[0.2em] text-bz-gray uppercase">
                BATTLEZONE
              </span>
              <span className="w-px h-3 bg-bz-border" aria-hidden="true" />
              <span className="font-display text-xs font-black tracking-widest text-bz-white uppercase">
                {pageTitle}
              </span>
            </div>
            {/* Mobile: just page title */}
            <span className="md:hidden font-display text-sm font-black tracking-widest text-bz-white uppercase">
              {pageTitle}
            </span>
          </div>

          {/* Right: search, bell, player quick info */}
          <div className="flex items-center gap-2">

            {/* Search button */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-sm text-bz-gray hover:text-bz-white hover:bg-bz-surface2 transition-colors"
              aria-label="Search"
            >
              <Search size={15} aria-hidden="true" />
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className={clsx(
                  'w-8 h-8 flex items-center justify-center rounded-sm transition-colors relative',
                  notifOpen
                    ? 'text-bz-white bg-bz-surface2'
                    : 'text-bz-gray hover:text-bz-white hover:bg-bz-surface2'
                )}
                aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}
                aria-expanded={notifOpen}
              >
                <Bell size={15} aria-hidden="true" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-bz-red shadow-red-glow-sm"
                    aria-hidden="true"
                  />
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <NotificationDropdown onClose={() => setNotifOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Player quick info */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-bz-border ml-1">
              <div className="flex items-center gap-1">
                <Coins size={12} className="text-bz-gold" aria-hidden="true" />
                <span className="font-mono text-bz-gold font-bold text-xs">
                  {(user?.coins || 4850).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Avatar
                  username={user?.username || 'GHOST_REAPER'}
                  size="sm"
                  online
                  src={user?.avatar}
                />
                <span className="font-display text-[10px] font-bold tracking-wider text-bz-white uppercase hidden lg:block">
                  {user?.username || 'GHOST_REAPER'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ── Scrollable content area ── */}
        <main className="flex-1 overflow-y-auto bg-bz-black bg-grid scrollbar-thin" tabIndex={-1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="min-h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
