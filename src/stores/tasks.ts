import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
//import axios from 'axios'
import axios from '../lib/axios'

export interface Task {
  _id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: string
  updatedAt: string
}

interface CreateTaskData {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

const API_BASE_URL = import.meta.env.VITE_API_URL

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const filter = ref<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const sortBy = ref<'createdAt' | 'priority' | 'status'>('createdAt')

  const filteredTasks = computed(() => {
    let filtered = tasks.value

    if (filter.value !== 'all') {
      filtered = filtered.filter(task => task.status === filter.value)
    }

    return filtered.sort((a, b) => {
      if (sortBy.value === 'createdAt') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy.value === 'priority') {
        const order = { high: 3, medium: 2, low: 1 }
        return order[b.priority] - order[a.priority]
      } else {
        return a.status.localeCompare(b.status)
      }
    })
  })

  const taskStats = computed(() => {
    const total = tasks.value.length
    const completed = tasks.value.filter(t => t.status === 'completed').length
    const inProgress = tasks.value.filter(t => t.status === 'in-progress').length
    const pending = tasks.value.filter(t => t.status === 'pending').length
    return { total, completed, inProgress, pending }
  })

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const initializeTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: getAuthHeaders()
      })
      tasks.value = response.data
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err.response?.data?.message || err.message)
      tasks.value = []
    }
  }

  const createTask = async (taskData: CreateTaskData) => {
    isLoading.value = true
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
        headers: getAuthHeaders()
      })
      tasks.value.unshift(response.data)
      return { success: true, task: response.data }
    } catch (error: any) {
      console.error('Failed to create task:', error.response?.data?.message || error.message)
      return { success: false, error: error.response?.data?.message || 'Failed to create task' }
    } finally {
      isLoading.value = false
    }
  }

  const updateTaskStatus = async (taskId: string, status: Task['status']) => {
    try {
      await axios.patch(`${API_BASE_URL}/tasks/${taskId}`, { status }, {
        headers: getAuthHeaders()
      })
      const task = tasks.value.find(t => t._id === taskId)
      if (task) task.status = status
    } catch (err: any) {
      console.error('Failed to update task status:', err.response?.data?.message || err.message)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
        headers: getAuthHeaders()
      })
      tasks.value = tasks.value.filter(t => t._id !== taskId)
    } catch (err: any) {
      console.error('Failed to delete task:', err.response?.data?.message || err.message)
    }
  }

  const setFilter = (newFilter: typeof filter.value) => {
    filter.value = newFilter
  }

  const setSortBy = (newSortBy: typeof sortBy.value) => {
    sortBy.value = newSortBy
  }

  const clearTasks = () => {
    tasks.value = []
  }

  return {
    tasks,
    isLoading,
    filter,
    sortBy,
    filteredTasks,
    taskStats,
    initializeTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
    setFilter,
    setSortBy,
    clearTasks
  }
})
