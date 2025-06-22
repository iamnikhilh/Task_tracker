<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 animate-fade-in">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-secondary-600 rounded-xl flex items-center justify-center mb-4">
          <UserPlus class="h-8 w-8 text-white" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900">Create Account</h2>
        <p class="mt-2 text-gray-600">Join our secure task management platform</p>
      </div>

      <form @submit.prevent="handleSignup" class="card space-y-6">
        <div v-if="authStore.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {{ authStore.error }}
        </div>

        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="input-field"
            placeholder="Enter your full name"
            :disabled="authStore.isLoading"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="input-field"
            placeholder="Enter your email"
            :disabled="authStore.isLoading"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="input-field"
            placeholder="Choose a secure password"
            :disabled="authStore.isLoading"
          />
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            class="input-field"
            placeholder="Confirm your password"
            :disabled="authStore.isLoading"
          />
        </div>

        <button
          type="submit"
          class="btn-primary w-full flex items-center justify-center space-x-2"
          :disabled="authStore.isLoading"
        >
          <Loader2 v-if="authStore.isLoading" class="h-4 w-4 animate-spin" />
          <span>{{ authStore.isLoading ? 'Creating Account...' : 'Create Account' }}</span>
        </button>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Already have an account?
            <router-link to="/login" class="text-primary-600 hover:text-primary-700 font-medium">
              Sign in here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

onMounted(() => {
  authStore.clearError()
})

const handleSignup = async () => {
  const result = await authStore.signup(form.value)
  if (result.success) {
    router.push('/dashboard')
  }
}
</script>