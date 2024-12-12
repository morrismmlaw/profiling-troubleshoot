<template>
  <div class="container-fluid ">

    <div class="login-background-image" style="position: relative; z-index: 0;">

      <NuxtParticles id="tsparticles" :options="TSoptions" />
      <NuxtParticles v-if="show" id="tsparticles2" :options="TSoptions" />

      <section class="position-relative py-4 py-xl-5">
        <div class="container col-md-6 col-xl-4 bg-semi-transparent rounded-3 p-5 shadow-sm">
          <div class="row mb-5">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <h1>Log in</h1>
              <p class="w-lg-90">Login With SSOID - Academic Staff</p>
            </div>
          </div>
          <div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-12">
              <div class="card mb-5 border-0 shadow rounded-3">
                <div class="card-body d-flex flex-column align-items-center">
                  <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg class="bi bi-person"
                      xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                      viewBox="0 0 16 16">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z">
                      </path>
                    </svg></div>

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
