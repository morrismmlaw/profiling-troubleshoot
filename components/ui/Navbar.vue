<template>
  <nav class="navbar navbar-expand bg-light">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <!-- This refer to public. -->
        <NuxtImg src="/img/HKBU.jpg" alt="Logo" class="logo-img" /> 
        HKBU Science Faculty Academic Profile
      </NuxtLink>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
      <div id="navcol-1" class="collapse navbar-collapse">
        <NuxtLink class="btn btn-info ms-auto me-2 shadow" role="button" to="/profile">Profile</NuxtLink>
        <NuxtLink class="btn btn-info me-2 shadow" role="button" to="/profileVueForm">Profile New</NuxtLink>
        <button v-if="isLoggedIn" class="btn btn-danger shadow" role="button" @click="logout">Log Out</button>
        <NuxtLink v-else class="btn btn-outline-primary shadow" role="button" to="/login">Sign In</NuxtLink>
      </div>
    </div>
  </nav>
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

<style scoped>
.navbar {
  border: 5px;
  border-radius: 5px;

  background-color: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

/* Add this CSS to style the logo image */
.logo-img {
  height: 50px; /* Adjust the height as needed */
}

</style>