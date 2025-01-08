<template>
  <div>

    <profile />
    
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const ssoid = route.params.ssoid

console.log('SSOID', ssoid)

import profile from './index.vue';

</script>

<style>

</style>