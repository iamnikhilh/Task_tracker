<template>
  <div class="card">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <Plus class="h-5 w-5 mr-2 text-primary-600" />
      Add New Task
    </h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          required
          class="input-field"
          placeholder="Enter task title"
          :disabled="taskStore.isLoading"
        />
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          v-model="form.description"
          rows="3"
          class="input-field resize-none"
          placeholder="Enter task description"
          :disabled="taskStore.isLoading"
        ></textarea>
      </div>

      <div>
        <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
          Priority Level
        </label>
        <select
          id="priority"
          v-model="form.priority"
          class="input-field"
          :disabled="taskStore.isLoading"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button
        type="submit"
        class="btn-primary w-full flex items-center justify-center space-x-2"
        :disabled="taskStore.isLoading || !form.title.trim()"
      >
        <Loader2 v-if="taskStore.isLoading" class="h-4 w-4 animate-spin" />
        <Plus v-else class="h-4 w-4" />
        <span>{{ taskStore.isLoading ? 'Creating...' : 'Create Task' }}</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Loader2 } from 'lucide-vue-next'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()

const form = ref({
  title: '',
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high'
})

const handleSubmit = async () => {
  const result = await taskStore.createTask(form.value)
  if (result.success) {
    form.value = {
      title: '',
      description: '',
      priority: 'medium'
    }
  }
}
</script>