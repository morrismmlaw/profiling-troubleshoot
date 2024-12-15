<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})
// ORUGA FILE SECTION


const imgUrl = ref(props.profile.attributes.photoURL || 'https://scholars.hkbu.edu.hk/assets/no-portrait-473c6d005990baa1f418d9c668dcd4ec.png');
// ORUGA FILE SECTION

import ProfileImage from './ProfileImage.vue';

const handleCroppedImg = (croppedImg) => {

  // Case Reset to HKBU Scholar
  if (croppedImg === null) {
    imgUrl.value = props.profile.attributes.photoURL;
  } else {
    console.log('Capture Emit Cropped image:', croppedImg);
    imgUrl.value = croppedImg;
    // handle the croppedImg value as needed
  }
};

</script>

<template>
  <div class="container-fluid">
    <div class="card shadow rounded-5 profile-card ms-3">

      <div class="row p-2 m-2">
        <div class="d-flex justify-content-center">
          <ProfileImage :img-url="imgUrl" :has-upload="true" @cropped-img="handleCroppedImg" />
        </div>
      </div>

      <div class="row">
        <div class="card-body text-center">
          <h5 class="card-title profile-card-text"> {{ props.profile.attributes.post }} </h5>
          <p class="card-text profile-card-text">{{ props.profile.attributes.name }} </p>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="card-body text-center d-flex justify-content-center">
          <img src="/img/orcid.logo.icon.svg" alt="orcid logo" class="orcid-logo" style="width: 1.2rem;">
          <a :href="props.profile.attributes.orcidURL" class="card-text profile-card-text ms-2">{{
            props.profile.attributes.orcidURL }} </a>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="card-body text-center d-flex justify-content-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill"
            viewBox="0 0 16 16">
            <path
              d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
          </svg>
          <a :href="props.profile.attributes.email" class="card-text profile-card-text ms-2">{{
            props.profile.attributes.email }} </a>
        </div>
        <hr>
      </div>

    </div>
  </div>
</template>



<style scoped>
.profile-card {
  background-color: #17769b;
}

.profile-card-text {
  color: aliceblue;
}
</style>