
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import ProtectedRoute from './components/ui/ProtectedRoute'

import LoadingScreen from './pages/LoadingScreen'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

import DashboardLayout from './layouts/DashboardLayout'
import Home from './pages/dashboard/Home'
import Lobby from './pages/lobby/Lobby'
import Matchmaking from './pages/lobby/Matchmaking'
import GameRoom from './pages/lobby/GameRoom'
import Profile from './pages/profile/Profile'
import Inventory from './pages/inventory/Inventory'
import Leaderboard from './pages/leaderboard/Leaderboard'
import Achievements from './pages/achievements/Achievements'
import Matches from './pages/matches/Matches'
import Settings from './pages/settings/Settings'

import AdminLayout from './pages/admin/AdminLayout'
import AdminOverview from './pages/admin/AdminOverview'
import AdminUsers from './pages/admin/AdminUsers'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import AdminReports from './pages/admin/AdminReports'

import NotFound from './pages/error/NotFound'
import Unauthorized from './pages/error/Unauthorized'

export default function App() {
  const [showLoading, setShowLoading] = useState(true)

  if (showLoading) {
    return (
      <LoadingScreen
        onComplete={() => setShowLoading(false)}
      />
    )
  }

  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected player routes */}
            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Home />} />
              <Route path="/lobby" element={<Lobby />} />
              <Route path="/matchmaking" element={<Matchmaking />} />
              <Route path="/room/:id" element={<GameRoom />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/matches" element={<Matches />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* Protected admin routes */}
            <Route
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Route>

            {/* Error routes */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  )
}
