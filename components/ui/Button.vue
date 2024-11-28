<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm',
      variant === 'primary' ? 'text-white bg-indigo-600 hover:bg-indigo-700' : '',
      variant === 'danger' ? 'text-white bg-red-600 hover:bg-red-700' : '',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      variant === 'primary' ? 'focus:ring-indigo-500' : '',
      variant === 'danger' ? 'focus:ring-red-500' : '',
      fullWidth ? 'w-full justify-center' : '',
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