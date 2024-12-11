<script setup>
const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeFromStorage()
  // if (!authStore.isAuthenticated) {
  //   router.push('/')
  // }
})

const handleSave = async (data) => {
  const success = await profileStore.updateProfile(data)
  if (success) {
    alert('Profile updated successfully')
    // location.reload();
  } else {
    alert('Failed to update profile')
  }

}
</script>

<template>
  <div class="container-fluid bg-light min-vh-100">
    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-12 col-xl-12 custom-background">
        <div v-if="authStore.isAuthenticated">
          <!-- <h2 class="text-center mb-4">Academic Profile</h2> -->
          <ProfileForm :profile="authStore.user" :collections="authStore.collections" @save="handleSave" />
        </div>
        <div v-else>
          <p class="text-center text-danger pt-4">Please login to view your profile.</p>
          <div class="text-center mt-4">
            <NuxtLink to="/" class="btn btn-primary">
              Go to Home Page
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.custom-background {
  background-image: url('https://play.tailwindcss.com/img/beams.jpg');
  background-size: cover;
  background-position: center;
}
</style>