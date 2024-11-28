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
  researchInterests: props.profile?.attributes.research_interest || '',
  biography: props.profile?.attributes.biography || ''
});

const handleSubmit = () => {
  emit('save', {
    researchInterests: formData.researchInterests
  });
};

watch(() => props.profile, (newProfile) => {
  if (newProfile) {
    formData.researchInterests = newProfile.attributes.research_interest;
  }
}, { immediate: true });
</script>

<template>
  <form @submit.prevent="handleSubmit" class="container mt-5">

    {{ console.log("Props.profile", props.profile) }}

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

        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
            <p class="form-control-plaintext">{{ profile?.attributes.name }}</p>
          </div>
        </div>
        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">SSOID</label>
          <div class="col-sm-10">
            <p class="form-control-plaintext">{{ profile?.attributes.ssoid }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <label for="biography" class="col-sm-2 col-form-label">Biography</label>
          <div class="col-sm-10">
            <tiptap-editor :formData="formData" field="biography" />
          </div>
        </div>
        <div class="row mb-3">
          <label for="academicInterests" class="col-sm-2 col-form-label">Academic Interests</label>
          <div class="col-sm-10">
            <tiptap-editor :formData="formData" field="researchInterests" />
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
          <label class="col-sm-2 col-form-label">Chinese Name</label>
          <div class="col-sm-10">
            <p class="form-control-plaintext">{{ profile?.attributes.chiname }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <label class="col-sm-2 col-form-label">HKBU Scholar Url</label>
          <div class="col-sm-10">
            <!-- <p class="form-control-plaintext">{{ profile?.attributes.url }}</p> -->
            <a :href="profile?.attributes.url" target="_blank" class="form-control-plaintext">{{
              profile?.attributes.url }}</a>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-primary" :disabled="profileStore.isLoading">
            {{ profileStore.isLoading ? 'Saving...' : 'Save' }}
          </button>
        </div>
        <p v-if="profileStore.error" class="text-danger mt-3">{{ profileStore.error }}</p>
      </div>
    </div>
  </form>


</template>