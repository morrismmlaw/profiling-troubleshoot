<template>
  <div class="min-h-screen bg-gray-100">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div v-if="authStore.isAuthenticated" class="max-w-3xl mx-auto">
          <h2 class="text-2xl font-bold mb-6">Academic Profile</h2>
          <ProfileForm
            :profile="authStore.user"
            @save="handleSave"
          />
        </div>
        <div v-else>
          <p class="text-center text-red-600">Please login to view your profile.</p>
          <div class="mt-4 text-center">
            <NuxtLink
              to="/"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    router.push('/')
  }
})

const handleSave = async (data: { academicInterests: string }) => {
  const success = await profileStore.updateProfile(data)
  if (success) {
    alert('Profile updated successfully')
  } else {
    alert('Failed to update profile')
  }
}
</script>