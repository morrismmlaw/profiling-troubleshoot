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
  <div class="container-fluid p-0 m-0">
    <div class="card shadow rounded-5 profile-card">

      <div class="row p-2 m-2">
        <div class="d-flex justify-content-center">
          <ProfileImage :img-url="imgUrl" :has-upload="true" @cropped-img="handleCroppedImg" />
        </div>
      </div>

      <div class="row">
        <div class="card-body text-center">
          <h5 class="card-title profile-card-text"> {{ props.profile.attributes.post }} </h5>
          <p class="card-text profile-card-text">{{ props.profile.attributes.name }} </p>
          <p class="card-text profile-card-text">{{ props.profile.attributes.chiname }} </p>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="card-body imgcard-info">
          <img src="/img/orcid.logo.icon.svg" alt="orcid logo" class="orcid-logo" style="width: 1.2rem;">
          <a :href="props.profile.attributes.orcidURL" class="card-text profile-card-text ms-2">{{
            props.profile.attributes.orcidURL }} </a>
        </div>
        <div class="card-body text-center d-flex justify-content-start imgcard-info">
          <img src="/img/orcid.logo.icon.svg" alt="orcid logo" class="orcid-logo" style="width: 1.2rem;">
          <a :href="props.profile.attributes.url" class="card-text profile-card-text ms-2">{{
            props.profile.attributes.url }} </a>
        </div>
        <hr>
      </div>
      <div class="row">
        <div class="card-body text-center d-flex justify-content-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge"
            viewBox="0 0 16 16">
            <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
          </svg>
          <p>Seasonal Academic <br> {{ props.profile.attributes.unit }} </p>

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

hr {
  border: none;
  height: 1px;
  background-color: white;
  background-image: linear-gradient(to right, transparent, white 50%, transparent);
  background-size: 1px 1px;
  background-repeat: repeat-x;
}

.imgcard-info {
  display: flex;
  justify-content: start;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: fade;
}

</style>