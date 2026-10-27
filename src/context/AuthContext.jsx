import React, { createContext, useContext, useState, useCallback } from 'react'
import { mockPlayer } from '../utils/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Phase 1: Mock auth - will be replaced with real JWT auth in Phase 2
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (credentials) => {
    setLoading(true)
    // Simulate async login
    await new Promise(r => setTimeout(r, 1500))
    setUser({ ...mockPlayer, ...credentials })
    setLoading(false)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const register = useCallback(async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 2000))
    setUser({ ...mockPlayer, username: data.username, email: data.email })
    setLoading(false)
    return true
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
