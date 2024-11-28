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
  const success = await authStore.login(ssoid.value);
  if (success) {
    emit('success');
  } else {
    emit('error');
  }
};
</script>

<template>
  <div class="container">

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
