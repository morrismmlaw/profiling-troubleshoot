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
    // console.log('Capture Emit Cropped image:', croppedImg);
    imgUrl.value = croppedImg;
    // handle the croppedImg value as needed
  }
};

</script>

<template>
  <div class="container-fluid">
    <div class="card shadow rounded-5 profile-card">

      <div class="row p-2 m-2">
        <div class="d-flex justify-content-center">
          <ProfileImage :img-url="imgUrl" :has-upload="true" @cropped-img="handleCroppedImg" />
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title profile-card-text">Profile Image</h5>
        <p class="card-text profile-card-text"> Upload an Alternative Image</p>
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