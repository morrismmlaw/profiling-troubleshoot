<script setup>

import { onBeforeMount } from 'vue';

const bgS1 = ref('')
const bgS2 = ref('')
const bgS3 = ref('')
const bgM = ref('')

const authStore = useAuthStore()
const router = useRouter()


onBeforeMount(async () => {
  console.log("On before Mount")
})

onMounted(async () => {
  authStore.initializeFromStorage()

  bgS1.value = '/img/bg-showcase-1.jpg'
  bgS2.value = '/img/bg-showcase-2.jpg'
  bgS3.value = '/img/bg-showcase-3.jpg'

  // bgM.value = '/img/bg-masthead.jpg' //Water Background
  // bgM.value = '/img/bg-scifac-1.webp'
  // bgM.value = '/img/bg-pergamon.jpg'
  // bgM.value = '/img/bg-inno.jpg'

  bgM.value = '/img/bg-scifac-2.jpg'
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


<template>

  <div id="app">

    <header class="text-center text-white masthead" style="no-repeat center center;background-size: cover;"
      :style="{ backgroundImage: `url(${bgM})` }">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-xl-9 mx-auto position-relative">
            <h1 class="mb-5 bold-elegant">Find an Expert at Hong Kong Baptist University</h1>
            <h3 class="mb-5">Your search starts here, whether you are looking for a supervisor to undertake a research degree, an industry expert for a specific project, or a potential partner or collaborator.</h3>
          </div>
          <div class="col-md-10 col-lg-8 col-xl-7 mx-auto position-relative">
            <form>
              <div class="row">
                <div class="col-12 col-md-9 mb-2 mb-md-0"><input class="form-control form-control-lg" type="email"
                    placeholder="Enter your email..." /></div>
                <div class="col-12 col-md-3"><button class="btn btn-primary btn-lg" type="submit">Sign up!</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </header>

    <footer class="bg-light footer">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 text-center text-lg-start my-auto h-100">
            <ul class="list-inline mb-2">
              <li class="list-inline-item"><a href="#">About</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Contact</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Terms of  Use</a></li>
              <li class="list-inline-item"><span>⋅</span></li>
              <li class="list-inline-item"><a href="#">Privacy Policy</a></li>
            </ul>
            <p class="text-muted small mb-4 mb-lg-0">© HKBU Science Faculty 2024. All Rights Reserved.</p>
          </div>
          <div class="col-lg-6 text-center text-lg-end my-auto h-100">
            <ul class="list-inline mb-0">
              <li class="list-inline-item"><a href="#"><i class="fa fa-facebook fa-2x fa-fw"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-twitter fa-2x fa-fw"></i></a></li>
              <li class="list-inline-item"><a href="#"><i class="fa fa-instagram fa-2x fa-fw"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

    <!-- <div class="container-fluid bg-light min-vh-100">
    <div class="row justify-content-center py-6">
      <div class="col-sm-12 col-lg-6 col-xl-4">
        <div v-if="!authStore.isAuthenticated">
          <h2 class="text-center mb-4">Login</h2>
          <LoginForm @success="handleLoginSuccess" @error="handleLoginError" />
        </div>
        <div v-else>
          <h2 class="text-center mb-4">Welcome, {{ authStore.user.attributes.name }}</h2>
          <div class="d-flex justify-content-center">
            <NuxtLink to="/profile" class="btn btn-primary mr-2">
              View Profile
            </NuxtLink>
            <button @click="handleLogout" class="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  </div>
</template>


<style scoped>
/* @import url('/assets/bootstrap/css/bootstrap.min.css'); */
/* @import url('/assets/css/animate.min.css'); */
/* @import url('/assets/css/Login-Form-Basic-icons.css'); */

/* // Use Either One for ICON. */
/* @import url('/assets/fonts/font-awesome.min.css');  */
/* @import url('@fortawesome/fontawesome-free/css/all.min.css'); */

.shadow {
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
}

.bold-elegant {
  font-weight: bold;
  font-family: 'Arial Black', Gadget, sans-serif;
}
</style>