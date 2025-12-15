import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'
import { useAuthStore } from './useAuth'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    UATprofile: null,

    profiles: null,
    totalProfiles: 0,
    isLoading: false,
    error: null
  }),

  actions: {
    async updateProfile(profileFormData, profileData) {
      console.log("useProfile", profileFormData);
      const { documentId, ...profileFormDataWithoutDocumentId } = profileFormData;
      console.log("documentId", documentId);
      console.log("profileFormDataWithoutDocumentId", profileFormDataWithoutDocumentId);

      this.isLoading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        if (!authStore.user) return false
        const response = await api.updateProfile(documentId, profileFormDataWithoutDocumentId, profileData)
        console.log("response", response);
        
        if (response.data) {
          console.log('update profile response:', response.data)
          console.log(response.data)

          this.profile = response.data
          authStore.user.attributes = response.data
          storage.setUser(authStore.user)
          return true
        }
        return false
      } catch (error) {
        console.error('Update profile error:', error)
        this.error = 'Failed to update profile. Please try again.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async fetchProfiles(page, perPage) {
      this.isLoading = true;
      try {
        console.log('Getting all the Profiles');
        const response = await api.findProfiles(page, perPage);
        
        if (response.data) {
          console.log(response.data, 'fetchProfiles');
          this.profiles = response.data;
          this.totalProfiles = response.meta?.pagination?.total || 0;
        }
      } catch (error) {
        console.error('Fetch profiles error:', error);
        this.error = 'Failed to fetch profiles. Please try again.';
      } finally {
        this.isLoading = false;
      }
    }
  }
})