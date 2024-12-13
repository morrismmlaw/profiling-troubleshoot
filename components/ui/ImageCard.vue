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
    <div class="card ms-3 shadow" style="max-width: 25rem;">
      <img class="card-img-top img-fluid" style="object-fit: cover;" :src="imgUrl"
        alt="Card image cap" />

      <div class="card-body">
        <h5 class="card-title">Profile Image</h5>
        <p class="card-text"> Upload an Alternative Image</p>
        <section>
          <o-field>
            <o-upload v-model="dropFiles" multiple drag-drop>
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



<style></style>