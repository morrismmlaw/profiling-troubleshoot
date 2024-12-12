<script setup>
import Navbar from './components/ui/Navbar.vue';

</script>

<template>
  <div>
    <NuxtLayout>
      <Navbar />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --navbar-height: 70px;
}
</style>