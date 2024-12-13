<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../composables/useAuth'; // replace with your actual path

const authStore = useAuthStore();
const ssoid = ref('');
const router = useRouter();
const emit = defineEmits(['success', 'error']);

const handleSubmit = async () => {
  console.log("Login Form doing the Login")
  const success = await authStore.login(ssoid.value);

  if (success) {
    router.push('/login-redirect');
    // emit('success');
  } else {
    router.push({
      path: '/login-redirect',
      query: { error: 'Login failed. Please try again.' }
    })
    // emit('error');
  }
};

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

onMounted(() => {
  //Stop Logined User from accessing.
  if (authStore.isAuthenticated) {
    router.push('/login-redirect');
  }
})

</script>

<template>
  <div class="container-fluid p-0 m-0">

    <div class="login-background-image" style="position: relative; z-index: 0;">
      <NuxtParticles id="tsparticles" :options="TSoptions" />
      <NuxtParticles v-if="show" id="tsparticles2" :options="TSoptions" />

      <section class="position-relative py-0 py-xl-1" style="margin-bottom: 2vh;">
        <div class="container col-md-6 col-xl-4 bg-semi-transparent rounded-3 p-5 shadow-sm login-box">
          <div class="row">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <h1>Log in</h1>
              <br>
              <p class="w-lg-90">Login With SSOID <br> Academic Staff</p>
            </div>
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

                  <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                      <label for="ssoid">SSOID</label>
                      <input id="ssoid" v-model="ssoid" class="form-control" type="text" required
                        placeholder="Enter your SSOID">
                      <small class="form-text text-muted">Integrate SSOID with HKBU...</small>
                    </div>
                    <p v-if="authStore.error" class="text-danger mt-2">{{ authStore.error }}</p>

                    <div class="mb-3"><input class="form-control" type="password" name="password"
                        placeholder="Placeholder Password..." /></div>
                    <button type="submit" class="btn btn-primary btn-block w-100" :disabled="authStore.isLoading">
                      {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
                    </button>
                    <p class="text-muted">Forgot your password?</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>

  </div>

</template>

<style>
/* @import url('/assets/bootstrap/css/bootstrap.min.css'); */
@import url('/assets/css/animate.min.css');
@import url('/assets/css/Login-Form-Basic-icons.css');

</style>