<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

// ORUGA FILE SECTION
const dropFiles = ref<File[]>([]);

function deleteDropFile(index: number): void {
  dropFiles.value.splice(index, 1);
}

const imgUrl = props.profile.attributes.photoURL || 'https://scholars.hkbu.edu.hk/assets/no-portrait-473c6d005990baa1f418d9c668dcd4ec.png';
// ORUGA FILE SECTION

import ProfileImage from './ProfileImage.vue';

</script>

<template>
  <div class="container-fluid">
    <div class="card shadow rounded-5 profile-card">

      <div class="row p-2 m-2">
        <div class="d-flex justify-content-center">
          <ProfileImage :img-url="imgUrl" :has-upload="true" />
        </div>
      </div>

      <div class="card-body">
        <h5 class="card-title profile-card-text">Profile Image</h5>
        <p class="card-text profile-card-text"> Upload an Alternative Image</p>
        <section>
          <o-field>
            <o-upload v-model="dropFiles" drag-drop>
              <div style="text-align: center">
                <p>
                  <o-icon icon="upload" size="is-large" />
                </p>
                <p>Drop your files here or click to upload</p>
              </div>
            </o-upload>
          </o-field>

          <div class="tags">
            <span v-for="(file, index) in dropFiles" :key="index">
              {{ file.name }}
              <o-button icon-left="times" size="small" native-type="button" @click="deleteDropFile(index)">
              </o-button>
            </span>
          </div>
        </section>
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