<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div v-if="!authStore.isAuthenticated" class="max-w-md mx-auto">
          <h2 class="text-2xl font-bold mb-4">Login</h2>
          <LoginForm
            @success="handleLoginSuccess"
            @error="handleLoginError"
          />
        </div>
        <div v-else>
          <h2 class="text-2xl font-bold mb-4">Welcome, {{ authStore.user.attributes.name }}</h2>
          <!-- <h2 class="text-2xl font-bold mb-4">Welcome, {{ authStore.user.name || 'NULL' }}</h2> -->
          <!-- <h2 class="text-2xl font-bold mb-4">Welcome, {{ 'NULL' }}</h2> -->
          <NuxtLink
            to="/profile"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Profile
          </NuxtLink>
          <button
            @click="handleLogout"
            class="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeFromStorage()
})

const handleLoginSuccess = () => {
  router.push('/profile')
}

const handleLoginError = () => {
  alert('Invalid SSOID')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>