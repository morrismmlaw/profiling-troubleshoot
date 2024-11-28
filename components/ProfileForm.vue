<script>
import { reactive, watch } from 'vue';
import { useProfileStore } from '../composables/useProfile'; // replace with your actual path

export default {
  props: {
    profile: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const profileStore = useProfileStore();

    const formData = reactive({
      academicInterests: props.profile?.attributes.academicInterests || ''
    });

    const handleSubmit = () => {
      this.$emit('save', {
        academicInterests: formData.academicInterests
      });
    };

    watch(() => props.profile, (newProfile) => {
      if (newProfile) {
        formData.academicInterests = newProfile.attributes.academicInterests;
      }
    }, { immediate: true });

    return {
      profileStore,
      formData,
      handleSubmit
    };
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="container mt-5">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Personal Information</h5>
        <p class="card-text">Your academic profile information.</p>
        <div class="row mb-3">
          <label for="academicInterests" class="col-sm-2 col-form-label">Academic Interests</label>
          <div class="col-sm-10">
            <textarea id="academicInterests" v-model="formData.academicInterests" rows="3"
              class="form-control"></textarea>
          </div>
        </div>
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