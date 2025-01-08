<script setup>

import Modal from 'bootstrap/js/dist/modal';

const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

const handleSave = async (data) => {
  const success = await profileStore.updateProfile(data, authStore.user)
  if (success) {
    alert('Profile updated successfully')
    //download new Data.
    authStore.setProfile(authStore.sso.ssoid);
    // location.reload();
  } else {
    alert('Failed to update profile')
    authStore.setProfile(authStore.sso.ssoid);
  }
}

onMounted(() => {
  // if (!authStore.isAuthenticated) {
  //   router.push('/')
  // }
  authStore.initializeFromStorage()

  if (authStore.isAuthenticated) {
    const myModal = new Modal(document.getElementById('exampleModal'));
    myModal.show();
  }
});

const checkedForm = ref(false);

const handleCheck = () => {
  checkedForm.value = !checkedForm.value;
}

watch(checkedForm, (newVal) => {
  console.log('Form Changed', newVal);
})

</script>

<template>

  <div class="nav-offset">
    <div class="bg-light custom-background">
      <div class="container-fluid">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Academic Profile Notification</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p class="profile-modal-message">
                  <br>
                  Your name, Chinese name, email, HKBU Scholar URL, and department have been imported from HKBU
                  Scholars.
                  <br>
                  <br>
                  If you would like to make any changes, please do so on HKBU Scholars.
                  <br>
                  <br>
                  We appreciate your help in updating the rest of the content as needed.
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-12">
            <div v-if="authStore.isAuthenticated || authStore.isAdmin">
              <div class="mt-3">
                <ProfileForm :profile="authStore.user" :collections="authStore.collections" @save="handleSave" />
              </div>
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
    </div>
  </div>

</template>


<style scoped>
.custom-background {
  background-image: url('https://play.tailwindcss.com/img/beams.jpg');
  background-size: cover ;
  /* background-position: center; */

  min-height: calc(100vh - var(--margin-offset));
}

.modal-title {
  font-family: var(--font-family);
  font-style: italic;
  font-size: 1.4rem;
  line-height: 1.8;
}

.profile-modal-message {
  font-family: var(--font-family);
  font-style: italic;
  font-size: 1.1rem;
  line-height: 1.5;
}
</style>