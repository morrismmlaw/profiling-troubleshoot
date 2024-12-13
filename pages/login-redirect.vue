<template>
  <div class="container-fluid p-0 m-0">

    <div class="login-background-image" style="position: relative; z-index: 0;">
      <NuxtParticles id="tsparticles" :options="TSoptions" />
      <NuxtParticles v-if="show" id="tsparticles2" :options="TSoptions" />

      <section class="position-relative py-0 py-xl-1">
        <div class="container col-md-6 col-xl-4 bg-semi-transparent rounded-3 p-5 shadow-sm login-box">
          <div class="row">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <h1>Log in</h1>
              <br>
              <p class="w-lg-90">Login With SSOID <br> Academic Staff</p>
            </div>
          </div>
          <div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-12">
              <div class="card mb-5 border-0 shadow rounded-3 login-box-inner">
                <div class="card-body d-flex flex-column align-items-center p-1">

                  <div v-if="isLoggedIn" class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                      class="bi bi-check2-all" viewBox="0 0 16 16">
                      <path
                        d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0" />
                      <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708" />
                    </svg>
                  </div>

                  <div v-else class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon bg-danger my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                      class="bi bi-exclamation" viewBox="0 0 16 16">
                      <path
                        d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0z" />
                    </svg>
                  </div>

                  <h1 class="card-title">{{ message }}</h1>
                  <p v-if="error" class="card-text">{{ error }}</p>
                  <p v-if="!isLoggedIn" class="card-text">Redirecting to login page in {{ countdown }} seconds...</p>
                  <p v-else class="card-text">Redirecting to home page in {{ countdown }} seconds...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  </div>
</template>

<script setup>

const store = useAuthStore()
const router = useRouter()
const route = useRoute()
const isLoggedIn = computed(() => store.isAuthenticated)
const message = computed(() => isLoggedIn.value ? 'Login successful!' : 'Login failed.')
const error = ref(route.query.error)

const countdown = ref(3);
let timerId = null;

onMounted(() => {
  if (!isLoggedIn.value) {
    timerId = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timerId)
        router.push('/login')
      }
    }, 1000)
  } else {
    countdown.value = 2
    timerId = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        clearInterval(timerId)
        router.push('/')
      }
    }, 1000)
  }

})

//TS PARTICLE
import { loadFull } from 'tsparticles'
import { tsParticles } from '@tsparticles/engine'

const { mode } = useRuntimeConfig().public.particles

const show = ref(true)

if (import.meta.client && mode === 'custom') {
  await loadFull(tsParticles)
}

const TSoptions = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  particles: {
    color: {
      value: "#c9a0a0"
    },
    links: {
      color: "#ff0000",
      enable: true
    },
    move: {
      enable: true
    },
    number: {
      value: 50
    }
  }
}

</script>
