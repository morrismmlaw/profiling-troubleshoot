<template>
  <div>
    <div class="mb-4">
      <form @submit.prevent="handleSubmit">
        <div class="d-flex justify-content-end mt-4">
          <button type="submit" class="btn btn-primary" :disabled="profileStore.isLoading">
            <svg xmlns="http://www.w3.org/2000/svg" width="0.9rem" height="0.9rem" fill="currentColor"
              class="bi bi-floppy2-fill me-2" viewBox="0 0 16 16">
              <path d="M12 2h-2v3h2z" />
              <path
                d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V2.914a1.5 1.5 0 0 0-.44-1.06L14.147.439A1.5 1.5 0 0 0 13.086 0zM4 6a1 1 0 0 1-1-1V1h10v4a1 1 0 0 1-1 1zM3 9h10a1 1 0 0 1 1 1v5H2v-5a1 1 0 0 1 1-1" />
            </svg>
            {{ profileStore.isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
          <p v-if="profileStore.error" class="text-danger mt-3">{{ profileStore.error }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { useProfileStore } from '#build/imports';

defineProps({
  handleSubmit: {
    type: Function as PropType<(event: Event) => void>,
    required: true
  },
  profileStore: {
    type: Object,
    required: true
  }
})

</script>

<style></style>