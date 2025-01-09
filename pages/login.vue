<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../composables/useAuth'; // replace with your actual path

const authStore = useAuthStore();
const ssoid = ref('');
const router = useRouter();
const emit = defineEmits(['success', 'error']);

const handleSubmit = async () => {
  console.log("Login Form doing the Login")
  const success = await authStore.setProfile(ssoid.value);

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
import ParticlesBackground from '~/components/ui/ParticlesBackground.vue';

onMounted(() => {
  //Stop Logined User from accessing.
  if (authStore.isAuthenticated) {
    router.push('/login-redirect');
  }
})

//OAUTH
// const urlUATD = 'https://issuat.hkbu.edu.hk/buam/buam2/err/bad_request.seam;jsessionid=QY7c6JbL1wW62ID3Mz4xf7Fz_DldaVHgIZG1_9TTh-JQ-xkPamDr!-1533894255?cid=21';

//Refractored URL: 
const SSO_AUTH_SERVER = 'https://issuat.hkbu.edu.hk';
const CLIENT_ID = 'SCI%2DPROFILE';
const REDIRECT_URI = 'https%3A%2F%2Fprofile%2Ddev.sci.hkbu.edu.hk%2Flogin%2Dredirect';
const STATE = ''; // Usually, the state is a random string used to prevent CSRF attacks. However, it's not present in your URL.
// const SSOIDRequestURL = `https://${SSO_AUTH_SERVER}/buam/Auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=get_user_portfolio&state=${STATE}`;

const SSOIDRedirect_Dev = 'https://issuat.hkbu.edu.hk/buam/Auth?client_id=SCI%2DPROFILE&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin-redirect&response_type=code&scope=get_user_portfolio';
const SSOIDRedirect_ITO = 'https://issuat.hkbu.edu.hk/buam/Auth?client_id=SCI%2DPROFILE&redirect_uri=https%3A%2F%2Fprofile%2Ddev.sci.hkbu.edu.hk%2Flogin%2Dredirect&response_type=code&scope=get_user_portfolio';

const SSOIDRedirect_DISCORD_ITO = 'https://discord.com/oauth2/authorize?client_id=1319869342611144784&response_type=code&redirect_uri=https%3A%2F%2Fprofile-cms.sci.hkbu.edu.hk%2Fapi%2Fconnect%2Fdiscord%2Fcallback&scope=identify+email+connections';
const SSOIDRedirect_DISCORD_LOCAL = 'https://discord.com/oauth2/authorize?client_id=1319869342611144784&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A1337%2Fapi%2Fconnect%2Fdiscord%2Fcallback&scope=identify+email+connections';

import { backendURL_ITO, backendURL_Local } from '@/composables/useAuth';
import { STRAPI_SSODiscordUrl_ITO, STRAPI_SSODiscordUrl_Local, STRAPI_SSOHKBUUrl_ITO, STRAPI_SSOHKBU_UAT_Url_ITO } from '../composables/useAuth';


const OAuthHKBU = async () => {
  // TBD by ITO Custom Provider.
  window.location.href = STRAPI_SSOHKBUUrl_ITO;
}

const OAuthDiscord = async () => {
  window.location.href = STRAPI_SSODiscordUrl_ITO;
}

const OAuthGoogle = async () => {
  window.location.href = STRAPI_SSOGoogleUrl_ITO;
}

const { getProviderAuthenticationUrl } = useStrapiAuth()

const signInWith = (str) => {
  switch (str) {
    case ('hkbu'):
      window.location.href = STRAPI_SSOHKBUUrl_ITO;
      break;
    case ('hkbu-uat'):
      window.location.href = STRAPI_SSOHKBU_UAT_Url_ITO;
      break;
    case ('google'):
      window.location.href = STRAPI_SSOGoogleUrl_ITO;
      break;
    case ('discord'):
      window.location.href = STRAPI_SSODiscordUrl_ITO;
      break;
  }
}

</script>

<template>
  <div class="container-fluid p-0 m-0">

    <div class="login-background-image-dark" style="position: relative; z-index: 0;">
      <ParticlesBackground />

      <section class="position-relative py-2 py-xl-3" style="margin-bottom: 2vh;">
        <div class="container col-md-6 col-xl-4 bg-semi-transparent rounded-3 p-5 shadow-sm login-box">
          <div class="row">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <h1 class="login-text">Log in</h1>
              <br>
              <p class="w-lg-90 login-text">Login With SSOID <br> Academic Staff</p>
            </div>
          </div>
          <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-12">
              <div class="card mb-5 border-0 shadow rounded-3 login-box-inner">
                <div class="card-body d-flex flex-column align-items-center p-1">
                  <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg class="bi bi-person"
                      xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                      viewBox="0 0 16 16">
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z">
                      </path>
                    </svg></div>

                  <!-- <form @submit.prevent="handleSubmit">
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

                    <div class="d-flex inline mt-1">
                      <div class="btn btn-info" @click="OAuthHKBU">
                        Login with SSOID
                      </div>
                      <div class="btn btn-info" @click="OAuthGoogle">
                        Login with GOOGLE
                      </div>
                      <div class="btn btn-info" @click="OAuthDiscord">
                        Login with DISCORD
                      </div>
                    </div>

                    <p class="text-muted">Forgot your password?</p>
                  </form> -->

                  <div class="container">
                    <div class="row justify-content-center">
                      <div class="col">
                        <div class="card border-0">
                          <div class="card-body">
                            <h2 class="card-title text-center mb-4">Single Sign-On</h2>
                            <div class="d-grid gap-3">
                              <button @click="signInWith('hkbu')" class="btn btn-primary sso-btn">
                                <i class="bi bi-mortarboard-fill me-2"></i> Sign in with SSOID
                              </button>
                              <!-- <button @click="signInWith('google')" class="btn btn-danger sso-btn">
                                <i class="bi bi-google me-2"></i> Sign in with Google
                              </button> -->
                              <!-- <button @click="signInWith('discord')" class="btn btn-success sso-btn">
                                <i class="bi bi-discord me-2"></i> Sign in with Discord
                              </button> -->
                            </div>
                            <p class="text-muted text-center mt-3">Forgot your password?</p>
                            <NuxtLink @click="signInWith('hkbu-uat')" class="btn">
                              <i class="bi bi-mortarboard-fill me-2"></i> Sign in with SSOID-DEVELOPMENT
                            </NuxtLink>
                            <NuxtLink @click="signInWith('discord')" class="btn">
                              <i class="bi bi-discord me-2"></i> Sign in with Discord-DEVELOPMENT
                            </NuxtLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

.sso-btn {
  width: 100%;
}
</style>