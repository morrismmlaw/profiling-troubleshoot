<template>

  <nav class="navbar bg-body-white py-0 z-3">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Offcanvas navbar</a> -->
      <NuxtLink class="navbar-brand" to="/">
        <NuxtImg src="/img/HKBU.jpg" alt="Logo" class="logo-img mx-2" />
        <span class="custom-text">HKBU Science Faculty Academic Profile</span>
      </NuxtLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <span class="d-flex align-items-center flex-nowrap ">
              <i class="bi bi-list me-2"> </i>
              Menu
            </span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-house me-2"></i>
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </span>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-box-arrow-in-right me-2"></i>
                <NuxtLink class="nav-link" to="/login">Staff Login</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-person-circle me-2"></i>
                <NuxtLink class="nav-link" to="/profile"> Your Profile</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class=" bi bi-box-arrow-left me-2"></i>
                <NuxtLink @click="logout" class="nav-link" to="/"> Logout</NuxtLink>
              </span>
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

.custom-text {
  font-family: system-ui;
  font-weight: 350;
  font-style: italic;
  font-size: 1.3rem;
}
</style>