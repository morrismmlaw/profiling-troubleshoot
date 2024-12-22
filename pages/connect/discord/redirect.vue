<template>

  <div class="nav-offset">
    <p>{{ text }}</p>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

// const backendUrl = 'https://profile-cms.sci.hkbu.edu.hk';
const backendUrl = 'http://localhost:1337';

const text = ref('Loading...');
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const providerName = 'discord';
  const search = route.fullPath.split('?')[1];

  console.log(search);

  const URL = `${backendUrl}/api/connect/${providerName}/callback?${search}`;

  await fetch(`${backendUrl}/api/connect/${providerName}/callback?${search}`)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      console.log(res)
      const response = res.json();
      console.log(response);
      return response;
    })
    .then(res => {
      // Successfully logged in with Strapi
      // Now saving the jwt to use it for future authenticated requests to Strapi
      localStorage.setItem('jwt', res.jwt);
      localStorage.setItem('username', res.user.username);
      text.value = 'You have been successfully logged in. You will be redirected in a few seconds...';
      setTimeout(() => router.push('/'), 3000); // Redirect to homepage after 3 sec
    })
    .catch(err => {
      console.log(err);
      text.value = 'An error occurred, please see the developer console.';
    });
});
</script>

