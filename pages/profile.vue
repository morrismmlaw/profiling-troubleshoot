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


import { Modal } from 'bootstrap';
onMounted(() => {
  const myModal = new Modal(document.getElementById('exampleModal'));
  myModal.show();
});

</script>

<template>


  <div class="container-fluid bg-light min-vh-100 custom-background nav-offset">

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Academic Profile Information</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Your name, Chinese name, email, HKBU Scholar URL, and department have been imported from HKBU Scholars. 
            <br>
            If you would like to make any changes, please do so on HKBU Scholars. 
            <br>
            We appreciate your help in updating the rest of the content as needed.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-12 col-xl-12 ">
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