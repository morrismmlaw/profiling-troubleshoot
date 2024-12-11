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

// ORUGA FILE SECTION
</script><template>
  <div>
    <div class="card ms-5 shadow" style="max-width: 20rem;">
      <img class="card-img-top img-fluid" style="object-fit: cover;" :src="`${props.profile.attributes.photoURL}`"
        alt="Card image cap" />

      <div class="card-body">
        <h5 class="card-title">User Image</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
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