import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'
import { useAuthStore } from './useAuth'

export const useProfileStore = defineStore('profile', {
  state: () => ({
    profile: null,
    isLoading: false,
    error: null
  }),

  actions: {
    async updateProfile(profileData) {
      this.isLoading = true
      this.error = null
      try {
        const authStore = useAuthStore()
        if (!authStore.user) return false

        const response = await api.updateProfile(authStore.user.id, profileData)

        if (response.data) {
          this.profile = response.data
          authStore.user = response.data
          storage.setUser(response.data)
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
    }
  }
})