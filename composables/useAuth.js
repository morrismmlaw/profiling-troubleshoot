/**
 * @file composables/useAuth.js
 * @description This file contains the Pinia store for handling authentication and data fetching.
 * @author Chan Hok Ting
 * @date 2022-03-15
 */

import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'

// Function to get all other collections type from Strapi
async function findCollection(collectionName) {

  try {
    const response = await api.findCollection(collectionName);
    if (response.data.length > 0) {
      // Handle the response data as needed for the specific collection
      console.log(`Got the ${collectionName} data`, response.data);
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Error getting ${collectionName} data:`, error);
    error.value = `Failed to get ${collectionName} data. Please try again.`;
    return null;
  } finally {
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    collections: null, //Get All Other Strapi Collections - SDGS, FCRA.. etc.
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
        //Get the Profile Data
        const response = await api.findProfileBySSoid(ssoid)
        if (response.data.length > 0) {
          this.user = {}; //Init the Object
          this.user.attributes = { ...response.data[0] }; // Lets store em here

          this.collections = {
            'departments' : await findCollection('departments'),
            'research-centres' : await findCollection('research-centres'),
            'research-outputs' : await findCollection('research-outputs'),
            'sdgs' : await findCollection('sdgs'),
          };

          this.isAuthenticated = true
          console.log("Got the User", this.user);
          console.log("Got the Collections", this.collections);
          storage.setUser(this.user)
          storage.setCollection(this.collections)
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
      console.log(storedUser)
      if (storedUser) {
        this.user = storedUser
        this.isAuthenticated = true
      }

      const storedCollection = storage.getCollection()
      if (storedCollection) {
        this.collections = storedCollection
      }

    }
  }
})