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
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <input id="ssoid" v-model="ssoid" label="SSOID" type="text" required />
    <button type="submit" variant="primary" full-width :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
    </button>
    <p v-if="authStore.error" class="text-red-600 text-sm">{{ authStore.error }}</p>
  </form>
</template>