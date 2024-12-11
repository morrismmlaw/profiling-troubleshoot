<template>

  <!-- 
  <nav class="navbar navbar-expand bg-light">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand" to="/">
        <NuxtImg src="/img/HKBU.jpg" alt="Logo" class="logo-img" />
        HKBU Science Faculty Academic Profile
      </NuxtLink>
      <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"></button>
      <div id="navcol-1" class="collapse navbar-collapse">
        <NuxtLink class="btn btn-info ms-auto me-2 shadow" role="button" to="/profile">Profile</NuxtLink>
        <button v-if="isLoggedIn" class="btn btn-danger shadow" role="button" @click="logout">Log Out</button>
        <NuxtLink v-else class="btn btn-outline-primary shadow" role="button" to="/login">Sign In</NuxtLink>
      </div>
    </div>
  </nav> 
  -->

  <nav class="navbar bg-body-tertiary">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Offcanvas navbar</a> -->
      <NuxtLink class="navbar-brand" to="/">
        <NuxtImg src="/img/HKBU.jpg" alt="Logo" class="logo-img" />
        HKBU Science Faculty Academic Profile
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <NuxtLink class="nav-link" to="/login">Staff Login</NuxtLink>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <NuxtLink class="nav-link" to="/profile">Your Profile</NuxtLink>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <NuxtLink @click="logout" class="nav-link" to="/">Logout</NuxtLink>
              <!-- <a class="nav-link" href="#">Login</a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

</template>

<script setup>

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
  height: 50px;
  /* Adjust the height as needed */
}
</style>