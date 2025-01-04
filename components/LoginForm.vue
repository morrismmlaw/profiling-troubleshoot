<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../composables/useAuth'; // replace with your actual path

import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

const authStore = useAuthStore();
const ssoid = ref('');
const emit = defineEmits(['success', 'error']);

const handleSubmit = async () => {
  console.log("Login Form doing the Login")
  const success = await authStore.setProfile(ssoid.value);
  if (success) {
    emit('success');
  } else {
    emit('error');
  }
};
</script>

<template>
  <div class="container">

    <section class="position-relative py-4 py-xl-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Log in</h2>
            <p class="w-lg-50">Login With SSOID - Academic Staff</p>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 col-xl-4">
            <div class="card mb-5">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg class="bi bi-person"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z">
                    </path>
                  </svg></div>
                <form class="text-center" method="post">
                  <div class="mb-3"><input class="form-control" type="email" name="email" placeholder="SSOID" /></div>
                  <div class="mb-3"><input class="form-control" type="password" name="password"
                      placeholder="Password" /></div>
                  <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit">Login</button></div>
                  <p class="text-muted">Forgot your password?</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="ssoid">SSOID</label>
        <input id="ssoid" v-model="ssoid" class="form-control" type="text" required placeholder="Enter your SSOID">
        <small class="form-text text-muted">We'll never share your SSOID with anyone else.</small>
      </div>
      <button type="submit" class="btn btn-primary btn-block" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="authStore.error" class="text-danger mt-2">{{ authStore.error }}</p>
    </form>

  </div>

</template>

<style scoped>
/* @import url('/assets/bootstrap/css/bootstrap.min.css'); */

@import url('/assets/css/animate.min.css');
@import url('/assets/css/Login-Form-Basic-icons.css');


</style>