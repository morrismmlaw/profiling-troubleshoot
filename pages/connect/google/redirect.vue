<template>

  <!-- <p>{{ text }}</p> -->
  <div class="container-fluid p-0 m-0">

    <div class="login-background-image-dark" style="position: relative; z-index: 0;">
      <ParticlesBackground />

      <section class="position-relative py-2 py-xl-3">
        <div class="container col-md-6 col-xl-4 bg-semi-transparent rounded-3 p-5 shadow-sm login-box">
          <div class="row">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <h1 class="login-text">Log in</h1>
              <br>
              <p class="w-lg-90 login-text">Login With SSOID <br> Academic Staff</p>
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
                  <p v-if="!isLoggedIn" class="card-text">Redirecting to login page in {{ countdown / 1000 }} seconds...
                  </p>
                  <p v-else class="card-text">Redirecting to home page in {{ countdown / 1000 }} seconds...</p>
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { backendURL_ITO, backendURL_Local } from '@/composables/useAuth';

import ParticlesBackground from '~/components/ui/ParticlesBackground.vue';

const authStore = useAuthStore();

const text = ref('Loading...');
const route = useRoute();
const router = useRouter();

const providerName = 'google';
const store = useAuthStore();

const message = computed(() => isLoggedIn.value ? `Login successful!` : 'Login failed.')
const error = ref(route.query.error)

const isLoggedIn = computed(() => store.isAuthenticated)

const countdown = ref(3000);

onMounted(async () => {
  const search = route.fullPath.split('?')[1];

  console.log(search);

  await fetch(`${backendURL_ITO}/api/auth/${providerName}/callback?${search}`)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      console.log(res)
      const response = res.json();
      console.log(response);
      return response;
    })
    .then(async res => {
      // Successfully logged in with Strapi
      // Now saving the jwt to use it for future authenticated requests to Strapi
      console.log(res);
      store.sso.provider = res.user.provider;
      store.sso.jwt = res.jwt;
      store.sso.username = res.user.username;
      store.sso.email = res.user.email;
      store.isAuthenticated = true;

      localStorage.setItem('jwt', res.jwt);
      localStorage.setItem('username', res.user.username);

      //Need to check with STRAPI, to get User status, and User profile is valid -> Admin / User ?
      const ssoid = res.user.email.split('@')[0];
      try {
        console.log(ssoid);
        authStore.getUser();

        const success = await authStore.getProfile(ssoid);
        console.log(success);
      } catch {
      }

      text.value = 'You have been successfully logged in. You will be redirected in a few seconds...';
      setTimeout(() => router.push('/'), countdown.value); // Redirect to homepage after 3 sec
    })
    .catch(err => {
      console.log(err);
      text.value = 'An error occurred, please see the developer console.';
    });
});
</script>
