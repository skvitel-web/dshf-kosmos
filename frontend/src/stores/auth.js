import { defineStore } from 'pinia'
import api from '@/api/axios'

const STORAGE_KEYS = {
  token: 'cosmos_token',
  role: 'cosmos_role',
  email: 'cosmos_email',
}

export const ROLE_ROUTES = {
  ADMIN: '/admin',
  TRAINER: '/trainer',
  PARENT: '/parent',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem(STORAGE_KEYS.token) || null,
    role: localStorage.getItem(STORAGE_KEYS.role) || null,
    email: localStorage.getItem(STORAGE_KEYS.email) || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    dashboardRoute: (state) => ROLE_ROUTES[state.role] || '/',
  },

  actions: {
    setSession({ token, role, email }) {
      this.token = token
      this.role = role
      this.email = email
      localStorage.setItem(STORAGE_KEYS.token, token)
      localStorage.setItem(STORAGE_KEYS.role, role)
      localStorage.setItem(STORAGE_KEYS.email, email)
    },

    clearSession() {
      this.token = null
      this.role = null
      this.email = null
      localStorage.removeItem(STORAGE_KEYS.token)
      localStorage.removeItem(STORAGE_KEYS.role)
      localStorage.removeItem(STORAGE_KEYS.email)
    },

    async login(email, password) {
      const { data } = await api.post('/api/auth/login', { email, password })
      this.setSession(data)
      return data
    },

    async register(payload) {
      await api.post('/api/auth/register', payload)
    },

    async forgotPassword(email) {
      await api.post('/api/auth/forgot-password', { email })
    },

    logout() {
      this.clearSession()
    },
  },
})
