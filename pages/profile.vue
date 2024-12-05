<script setup lang="ts">
const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

onMounted(() => {

  authStore.initializeFromStorage()

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

<template>
  <div class="container-fluid bg-light min-vh-100">
    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-8 col-xl-6">
        <div v-if="authStore.isAuthenticated">
          <h2 class="text-center mb-4">Academic Profile</h2>
          <ProfileForm :profile="authStore.user" @save="handleSave" />
        </div>
        <div v-else>
          <p class="text-center text-danger">Please login to view your profile.</p>
          <div class="text-center mt-4">
            <NuxtLink to="/" class="btn btn-primary">
              Go to Login
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
