<template>

  <nav class="navbar sticky-top py-0 z-3" :style="navbarStylePerRoute"
    style="position: absolute; top: 0; left: 0; width: 100%; z-index: 2;">
    <div class="container-fluid">

      <div class="d-flex">
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\bu-logo-white.f7871964.png" alt="Logo" class="logo-img-1 ms-4" />
        </NuxtLink>
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\scilogo_v3_White_1012ver.e2d2cba4.png" alt="Logo" class="logo-img-2" />
        </NuxtLink>

        <div v-if="$route.path === '/profile'" class="d-flex align-items-center ms-1">
          {{ console.log("is in profile") }}
          <div class="custom-text-bar"> Academic Profile</div>
        </div>
      </div>

      <!-- <div v-else class="d-flex">
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\bu-logo-white.f7871964.png" alt="Logo" class="logo-img-1 ms-4" />
        </NuxtLink>
        <NuxtLink class="navbar-brand" to="/">
          <NuxtImg src="\img\scilogo_v3_White_1012ver.e2d2cba4.png" alt="Logo" class="logo-img-2" />
        </NuxtLink>
      </div> -->

      <button class="navbar-toggler bg-body-secondary semi-transparent" type="button" data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end semi-transparent-1" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
            <span class="d-flex align-items-center flex-nowrap ">
              <i class="bi bi-list me-3"> </i>
              Menu
            </span>
          </h5>
          <button type="button" class="btn-close" style="width: 3rem; height: 2rem; margin-right: 12px;"
            data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item custom-nav-item">
              <span class="d-flex align-items-center flex-nowrap" data-bs-dismiss="offcanvas">
                <i class="bi bi-house me-3"></i>
                <NuxtLink class="nav-link" to="/">Home</NuxtLink>
              </span>
            </li>
            <li v-if="!isLoggedIn" class="nav-item custom-nav-item">
              <span class="d-flex align-items-center flex-nowrap" data-bs-dismiss="offcanvas">
                <i class="bi bi-box-arrow-in-right me-3" style="margin-left: -3px;"></i>
                <NuxtLink class="nav-link" to="/login">Staff Login</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item custom-nav-item">
              <span class="d-flex align-items-center flex-nowrap" data-bs-dismiss="offcanvas">
                <i class="bi bi-person-circle me-3"></i>
                <NuxtLink class="nav-link" to="/profile"> Your Profile</NuxtLink>
              </span>
            </li>
            <li v-if="isLoggedIn" class="nav-item custom-nav-item">
              <span class="d-flex align-items-center flex-nowrap" data-bs-dismiss="offcanvas">
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
  authStore.logout();
  router.push('/');
}

const isLoggedIn = computed(() => authStore.isAuthenticated);

const isSearch = computed(() => route.path === '/search');

const logout = () => {
  authStore.logout();
  // window.location.reload(); // Fix Dat bad Search dropdown.. after logout
  router.push('/');
};

const navbarStylePerRoute = computed(() => {
  if (route.path === '/profile') {
    // return { backgroundColor: 'rgba(37, 150, 190, 0.7)' }; //Marine Blue
    return { backgroundColor: 'white' };
    // return { backgroundColor: 'transparent' };
  } else if (route.path === '/search') {
    // return { backgroundColor: 'rgb(177, 177, 177, 0.9)' };
    // return { backgroundColor: 'rgba(37, 150, 190, 0.9)' }; //Light Blue
    return { backgroundColor: 'white' };
  } else if (route.path === '/login' || route.path === '/login-redirect') {
    return { backgroundColor: 'rgba(83 ,183, 209, 0.55)' }; //Light Blue
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
.logo-img-1 {
  height: 45px;
  /* Adjust the height as needed */
  margin-top: 10px;
}

.logo-img-2 {
  height: 60px;
  /* Adjust the height as needed */
  margin-top: 1px;
}

.custom-text {
  font-family: system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2rem;
}

.custom-text-bar {
  font-family: system-ui;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.bi {
  font-size: 1.5rem;
}

.semi-transparent {
  opacity: 0.5;
}

.semi-transparent-1 {
  background-color: hsla(0, 0%, 100%, 0.9);
}

.custom-nav-item {
  font-size: 1.2rem;
  /* padding: 1rem; */
  padding-top: 0.5rem;

}
</style>