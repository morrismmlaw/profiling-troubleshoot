import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  actions: {
    async login(ssoid) {
      console.log("Loggin in")
      this.isLoading = true
      this.error = null
      try {
        const response = await api.findProfileBySSoid(ssoid)
        if (response.data.length > 0) {
          this.user = response.data[0]
          this.user.attributes = {... response.data[0]};
          this.isAuthenticated = true
          console.log("Got the User", this.user);
          storage.setUser(this.user)
          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        this.error = 'Failed to login. Please try again.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      storage.setUser(null)
    },

    initializeFromStorage() {
      const storedUser = storage.getUser()
      if (storedUser) {
        this.user = storedUser
        this.isAuthenticated = true
      }
    }
  }
})