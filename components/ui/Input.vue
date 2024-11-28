<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      v-model="inputValue"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      @input="$emit('update:modelValue', inputValue)"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  id: string
  label?: string
  type?: string
  required?: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})</script>