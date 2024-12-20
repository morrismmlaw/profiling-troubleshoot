<template>
  <div>
    <div class="mb-4">
      <form @submit.prevent="handleSubmit">
        <div class="d-flex justify-content-end mt-4">
          <button type="submit" class="btn btn-primary" :disabled="profileStore.isLoading">
            {{ profileStore.isLoading ? 'Saving...' : 'Save' }}
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
    type: useProfileStore,
    required: true
  }
})

</script>

<style></style>