<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Shield class="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-900">Task Tracker</h1>
              <p class="text-sm text-gray-600">Welcome back, {{ authStore.user?.name }}</p>
            </div>
          </div>
          <button
            @click="authStore.logout"
            class="btn-secondary flex items-center space-x-2"
          >
            <LogOut class="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Tasks</p>
              <p class="text-2xl font-bold text-gray-900">{{ taskStore.taskStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ taskStore.taskStats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Play class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-bold text-gray-900">{{ taskStore.taskStats.inProgress }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">{{ taskStore.taskStats.completed }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Task Form -->
        <div class="lg:col-span-1">
          <TaskForm />
        </div>

        <!-- Task List -->
        <div class="lg:col-span-2">
          <TaskList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Shield, LogOut, BarChart3, Clock, Play, CheckCircle } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'
import { useTaskStore } from '../stores/tasks'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'

const authStore = useAuthStore()
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.initializeTasks()
})
</script>