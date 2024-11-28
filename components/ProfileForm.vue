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
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">Your academic profile information.</p>
        </div>
        
        <div class="mt-5 md:mt-0 md:col-span-2">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <TextArea
                id="academicInterests"
                v-model="formData.academicInterests"
                label="Academic Interests"
                :rows="3"
              />
            </div>

            <div class="col-span-6">
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <p class="mt-1 text-sm text-gray-900">{{ profile?.attributes.name }}</p>
            </div>

            <div class="col-span-6">
              <label class="block text-sm font-medium text-gray-700">SSOID</label>
              <p class="mt-1 text-sm text-gray-900">{{ profile?.attributes.ssoid }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end">
      <Button
        type="submit"
        variant="primary"
        :disabled="profileStore.isLoading"
      >
        {{ profileStore.isLoading ? 'Saving...' : 'Save' }}
      </Button>
    </div>
    
    <p v-if="profileStore.error" class="text-red-600 text-sm">{{ profileStore.error }}</p>
  </form>
</template>