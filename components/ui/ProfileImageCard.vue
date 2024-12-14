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
</script>

<template>
  <div>
    <div class="card ms-5 shadow rounded-5 profile-card" style="max-width: 20vw;">

      <div class="container p-5 m-5">
        <img class="card-img-top rounded-circle img-fluid profile-card-image" style="object-fit: cover;" :src="imgUrl"
          alt="Card image cap" />

        <i class="bi bi-upload upload-icon"></i>
      </div>

      <div class="card-body">
        <h5 class="card-title  profile-card-text">Profile Image</h5>
        <p class="card-text  profile-card-text"> Upload an Alternative Image</p>
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
.profile-card-image {
  width: 240px;
  height: 240px;
}

.profile-card {
  background-color: #17769b
}

.profile-card-text {
  color: aliceblue;
}

.upload-icon {
  color: white;
  font-size: 1.5rem;
  position: relative;

  left: -70px;
  top: 100px;

  padding: 10px;

  background: gray;
  border-radius: 50%;
}

/* .upload-icon::before {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  border-radius: 50%;
  opacity: 0.5;
} */
</style>