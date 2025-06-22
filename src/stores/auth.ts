import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useTaskStore } from './tasks'

interface User {
  id: string
  email: string
  name: string
}

interface LoginCredentials {
  email: string
  password: string
}

interface SignupCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const API_BASE = 'http://localhost:3001/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const isAuthenticated = computed(() => !!user.value)

  const initializeAuth = () => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    if (savedUser && token) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (e) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
  }

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await axios.post(`${API_BASE}/login`, credentials)
      // assuming response.data = { user: { id, name, email }, token: "..." }
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)  // ✅ store token
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed. Please try again.'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    isLoading.value = true
    error.value = null

    if (credentials.password !== credentials.confirmPassword) {
      error.value = 'Passwords do not match'
      isLoading.value = false
      return { success: false, error: error.value }
    }

    try {
      const response = await axios.post(`${API_BASE}/signup`, credentials)
      user.value = response.data.user
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)  // ✅ store token
      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signup failed. Please try again.'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('token')  // ✅ also remove token

    const taskStore = useTaskStore()
    taskStore.clearTasks()

    router.push('/login')
  }

  const getToken = () => localStorage.getItem('token')  // ✅ optional helper

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    initializeAuth,
    login,
    signup,
    logout,
    getToken,
    clearError
  }
})
