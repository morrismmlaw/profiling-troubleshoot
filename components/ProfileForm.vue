<script setup>
import { reactive, watch, defineEmits } from 'vue';
import { useProfileStore } from '../composables/useProfile'; // replace with your actual path
import TiptapEditor from './TiptapEditor.vue' // path to your Tiptap editor component

const props = defineProps({
  profile: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['save']);

const profileStore = useProfileStore();

const formData = reactive({
  research_interest: props.profile?.attributes.research_interest || '',
  biography: props.profile?.attributes.biography || '',

  documentId: props.profile?.attributes.documentId || '',

  SDG: props.profile?.attributes.SDG ? props.profile.attributes.SDG.split(',').map(Number) : [],
  fcra: props.profile?.attributes.fcra || [],
});

const handleSubmit = () => {
  emit('save', {
    research_interest: formData.research_interest, //HAHA TYPO
    biography: formData.biography,
    documentId: formData.documentId //This is the Uniquite ID of THis USER.. Profile.. - BY STRAPI Standard.
  });
};

// watch(() => props.profile, (newProfile) => {
//   if (newProfile) {
//     formData.research_interests = newProfile.attributes.research_interest;
//   }
// }, { immediate: true });


const sdgOptions = ['SDG1', 'SDG2', 'SDG3', 'SDG4', 'SDG5', 'SDG6', 'SDG7', 'SDG8', 'SDG9', 'SDG10', 'SDG11', 'SDG12', 'SDG13', 'SDG14', 'SDG15', 'SDG16', 'SDG17']
const fcraOptions = ['Option 1', 'Option 2', 'Option 3']; // Replace with actual FCRA options

//FCRA Search
const options = [
  {
    label: "Jesse Simmons",
    value: {
      id: 1,
      user: { first_name: "Jesse", last_name: "Simmons" },
      date: "2016/10/15 13:43:27",
      gender: "Male",
    },
  },
  {
    label: "John Jacobs",
    value: {
      id: 2,
      user: { first_name: "John", last_name: "Jacobs" },
      date: "2016/12/15 06:00:53",
      gender: "Male",
    },
  },
  {
    label: "Tina Gilbert",
    value: {
      id: 3,
      user: { first_name: "Tina", last_name: "Gilbert" },
      date: "2016/04/26 06:26:28",
      gender: "Female",
    },
  },
  {
    label: "Clarence Flores",
    value: {
      id: 4,
      user: { first_name: "Clarence", last_name: "Flores" },
      date: "2016/04/10 10:28:46",
      gender: "Male",
    },
  },
  {
    label: "Ruby Snyder",
    value: {
      id: 21,
      user: { first_name: "Ruby", last_name: "Snyder" },
      date: "2017/04/01 12:04:39",
      gender: "Female",
    },
  },
];

const tags = ref([]);
const allowNew = ref(false);
const allowDuplicates = ref(false);
const openOnFocus = ref(false);
const keepFirst = ref(false);
const keepOpen = ref(true);

</script>

<template>

  <div class="container-fluid">

    <div class="row mt-4 mb-4">

      <div class="col-3">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top"
            :src="`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s7`"
            alt="Card image cap" />

          <div class="card-body">
            <h5 class="card-title">User Image</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
              content.</p>
            <!-- <a href="#" class="btn btn-primary">TEST BUTTON</a> -->
          </div>
        </div>
      </div>


      <div class="col">
        <form @submit.prevent="handleSubmit" class="container-fluid">
          {{ console.log("ProfileForm - Props", props) }}

          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Personal Information</h5>
              <p class="card-text">Your academic profile information.</p>

              <!-- <div class="row mb-3">
          <label for="academicInterests" class="col-sm-2 col-form-label">Academic Interests</label>
          <div class="col-sm-10">
            <textarea id="academicInterests" v-model="formData.researchInterests" rows="3"
              class="form-control"></textarea>
          </div>
        </div>
        <div class="row mb-3">
          <label for="academicInterests" class="col-sm-2 col-form-label">Biography</label>
          <div class="col-sm-10">
            <textarea id="academicInterests" v-model="formData.biography" rows="3" class="form-control"></textarea>
          </div>
        </div> -->

              <div class="row">
                <div class="col">
                  <div class="row mb-3">
                    <label class="col-form-label">Name</label>
                    <div class="col-sm-10">
                      <p class="form-control-plaintext">{{ profile?.attributes.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <!-- <o-field label="Chinese Name">
                    <o-input v-model="profile.attributes.chiname" disabled/>
                  </o-field> -->
                  <div class="row mb-3">
                    <label class="col-form-label">Chinese Name</label>
                    <div class="col-sm-10">
                      <p class="form-control-plaintext">{{ profile?.attributes.chiname }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                  <p class="form-control-plaintext">{{ profile?.attributes.email }}</p>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-2 col-form-label">Department</label>
                <div class="col-sm-10">
                  <p class="form-control-plaintext">{{ profile?.attributes.unit }}</p>
                </div>
              </div>

              <div class="row mb-3">
                <label class="col-sm-4 col-form-label">HKBU Scholar Url</label>
                <div class="col-sm-10">
                  <!-- <p class="form-control-plaintext">{{ profile?.attributes.url }}</p> -->
                  <a :href="profile?.attributes.url" target="_blank" class="form-control-plaintext">{{
                    profile?.attributes.url }}</a>
                </div>
              </div>

              <!-- <div class="row mb-3">
                <label class="col-sm-2 col-form-label">SSOID</label>
                <div class="col-sm-10">
                  <p class="form-control-plaintext">{{ profile?.attributes.ssoid }}</p>
                </div>
              </div> -->

              <div class="row mb-3">
                <label for="biography" class="col-sm-2 col-form-label">Biography</label>
                <div class="col-sm-10">
                  <tiptap-editor :formData="formData" field="biography" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="academicInterests" class="col-sm-2 col-form-label">Academic Interests</label>
                <div class="col-sm-10">
                  <tiptap-editor :formData="formData" field="research_interest" />
                </div>
              </div>


              <div class="row">
                <div class="col-2">
                  <h6>Sustainable Development Goals (SDG)</h6>
                </div>
                <div class="col">
                  <div class="columns is-multiline">
                    <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
                      <o-field>
                        <o-checkbox v-model="formData.SDG" :native-value="sdg">
                          {{ sdg }}
                        </o-checkbox>
                      </o-field>
                    </div>
                  </div>
                </div>
              </div>

              <!-- <div class="row mb-3">
                <o-field label="FCRA">
                  <o-select v-model="formData.fcra" multiple :data="fcraOptions" />
                </o-field>
              </div> -->
              <section>
                <o-field label="FCRA">
                  <o-taginput v-model="tags" :options="options" :allow-new="allowNew" :allow-duplicates="false"
                    :open-on-focus="openOnFocus" :keep-open="false" :keep-first="keepFirst" icon="tag"
                    placeholder="Add an item" expanded />
                </o-field>
                <!-- <p><b>FCRAS:</b> {{ tags }}</p> -->
              </section>

              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary" :disabled="profileStore.isLoading">
                  {{ profileStore.isLoading ? 'Saving...' : 'Save' }}
                </button>
              </div>
              <p v-if="profileStore.error" class="text-danger mt-3">{{ profileStore.error }}</p>
            </div>
          </div>
        </form>
      </div>

    </div>
  </div>

</template>

<style scoped>
.columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 8px;
}
</style>