<template>
  <div class="container-fluid bg-light min-vh-100">
    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div v-if="!authStore.isAuthenticated">
          <h2 class="text-center mb-4">Login</h2>
          <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
        </div>
        <div v-else>
          <h2 class="text-center mb-4">Welcome, {{ authStore.user.attributes.name }}</h2>
          <div class="d-flex justify-content-center">
            <NuxtLink to="/profile" class="btn btn-primary mr-2">
              View Profile
            </NuxtLink>
            <button @click="handleLogout" class="btn btn-danger">
              Logout
            </button>
          </div>
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