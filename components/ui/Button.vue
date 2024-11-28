<template>
  <button
    :type="type"
    :class="[
      'btn',
      variant === 'primary' ? 'btn-primary' : '',
      variant === 'danger' ? 'btn-danger' : '',
      fullWidth ? 'btn-block' : '',
      className
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit'
  variant?: 'primary' | 'danger'
  fullWidth?: boolean
  className?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()</script>