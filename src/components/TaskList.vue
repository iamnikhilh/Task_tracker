<template>
  <div class="space-y-6">
    <!-- Filters and Controls -->
    <div class="card">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center space-x-4">
          <div>
            <label for="filter" class="block text-sm font-medium text-gray-700 mb-1">
              Filter by Status
            </label>
            <select
              id="filter"
              v-model="taskStore.filter"
              @change="taskStore.setFilter(($event.target as HTMLSelectElement).value as 'all' | 'pending' | 'in-progress' | 'completed')"
              class="input-field min-w-[140px]"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label for="sort" class="block text-sm font-medium text-gray-700 mb-1">
              Sort by
            </label>
            <select
              id="sort"
              v-model="taskStore.sortBy"
              @change="taskStore.setSortBy(($event.target as HTMLSelectElement).value as 'createdAt' | 'priority' | 'status')"
              class="input-field min-w-[140px]"
            >
              <option value="createdAt">Date Created</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        <div class="text-sm text-gray-600">
          Showing {{ taskStore.filteredTasks.length }} tasks
        </div>
      </div>
    </div>

    <!-- Task Cards -->
    <div class="space-y-4">
      <TransitionGroup name="slide" tag="div" class="space-y-4">
        <div
          v-for="task in taskStore.filteredTasks"
          :key="task._id"
          class="task-card animate-slide-up"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <h4 class="text-lg font-semibold text-gray-900">{{ task.title }}</h4>
                <span
                  :class="getPriorityClass(task.priority)"
                  class="px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ task.priority.toUpperCase() }}
                </span>
              </div>
              
              <p v-if="task.description" class="text-gray-600 mb-3">
                {{ task.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span class="flex items-center">
                    <Calendar class="h-4 w-4 mr-1" />
                    {{ formatDate(task.createdAt) }}
                  </span>
                </div>
                
                <div class="flex items-center space-x-2">
                  <select
                    :value="task.status"
                    @change="updateStatus(task._id, ($event.target as HTMLSelectElement).value as Task['status'])"
                    :class="getStatusClass(task.status)"
                    class="text-xs font-medium px-3 py-1 rounded-full border-0 focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  
                  <button
                    @click="deleteTask(task._id)"
                    class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <div v-if="taskStore.filteredTasks.length === 0" class="text-center py-12">
        <div class="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ListTodo class="h-8 w-8 text-gray-400" />
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
        <p class="text-gray-600">
          {{ taskStore.filter === 'all' ? 'Create your first task to get started!' : `No ${taskStore.filter} tasks found.` }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Calendar, Trash2, ListTodo } from 'lucide-vue-next'
import { useTaskStore, type Task } from '../stores/tasks'

const taskStore = useTaskStore()

const getPriorityClass = (priority: Task['priority']) => {
  const classes = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return classes[priority]
}

const getStatusClass = (status: Task['status']) => {
  const classes = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }
  return classes[status]
}

const formatDate = (dateStr: string | Date | undefined | null) => {
  if (!dateStr) return 'Invalid date'

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return 'Invalid date'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

const updateStatus = (taskId: string, status: Task['status']) => {
  taskStore.updateTaskStatus(taskId, status)
}

const deleteTask = (taskId: string) => {
  if (confirm('Are you sure you want to delete this task?')) {
    taskStore.deleteTask(taskId)
  }
}
</script>
