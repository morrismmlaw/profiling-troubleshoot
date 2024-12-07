<template>
  <div>
    <nav class="navbar navbar-expand bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">HKBU Science Faculty Academic Profile</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
        <div id="navcol-1" class="collapse navbar-collapse">
          <!-- <a class="btn btn-info ms-auto me-2 shadow" role="button" href="/test">Test</a> -->
          <a class="btn btn-info ms-auto me-2 shadow" role="button" href="/profile">Profile</a>
          <a class="btn btn-info me-2 shadow" role="button" href="/profileVueForm">Profile New</a>
          <a v-if="isLoggedIn" class="btn btn-danger shadow" role="button" @click="logout">Log Out</a>
          <a v-else class="btn btn-outline-primary shadow" role="button" href="/login">Sign In</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>

import { onBeforeMount } from 'vue';


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

const isLoggedIn = computed(() => authStore.isAuthenticated);

const logout = () => {
  authStore.logout();
};

</script>

<style></style>

<style scoped>
.navbar {
  border: 5px;
  border-radius: 5px;

  background-color: #f0f8ff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}
</style>