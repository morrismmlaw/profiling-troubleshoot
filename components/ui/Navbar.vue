<template>


  <nav class="navbar sticky-top py-0 z-3" :style="navbarStyle"
    style="position: absolute; top: 0; left: 0; width: 100%; z-index: 2;">
    <div class="container-fluid">

      <div class="d-flex">
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\bu-logo-white.f7871964.png" alt="Logo" class="logo-img ms-4" />
        </NuxtLink>
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\scilogo_v3_White_1012ver.e2d2cba4.png" alt="Logo" class="logo-img" />
        </NuxtLink>
      </div>

      <button class="navbar-toggler bg-body-secondary" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <span class="d-flex align-items-center flex-nowrap ">
              <i class="bi bi-list me-3"> </i>
              Menu
            </span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-house me-3"></i>
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </span>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-box-arrow-in-right me-3" style="margin-left: -3px;"></i>
                <NuxtLink class="nav-link" to="/login">Staff Login</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class="bi bi-person-circle me-3"></i>
                <NuxtLink class="nav-link" to="/profile"> Your Profile</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <span class="d-flex align-items-center flex-nowrap ">
                <i class=" bi bi-box-arrow-left me-3"></i>
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
const route = useRoute()

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

const navbarStyle = computed(() => {
  if (route.path === '/profile') {
    return { backgroundColor: 'rgba(37, 150, 190, 0.7)' };
  } else {
    return { backgroundColor: 'transparent' };
  }
});

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
  height: 60px;
  /* Adjust the height as needed */
}

.custom-text {
  font-family: system-ui;
  font-weight: 350;
  font-style: italic;
  font-size: 1.3rem;
}

.bi {
  font-size: 1.5rem;
}
</style>