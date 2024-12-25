/**
 * @file composables/useAuth.js
 * @description This file contains the Pinia store for handling authentication and data fetching.
 * @author Chan Hok Ting
 * @date 2022-03-15
 */

import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'

// const { login } = useStrapiAuth();

const collectionNames = [
  'departments',
  'research-centres',
  'research-outputs',
  'research-foci',
  'sdgs',
  'fcras',
  'available-supervisions',
];

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

// const StrapiLogin = async (ssoid, pw) => {
//   try {
//     await login({ identifier: ssoid, password: pw })
//     return true;
//   } catch (e) {
//     return false;
//    }
// }

//SSO SECTION
export const backendURL_Local = 'http://localhost:1337';
export const backendURL_ITO = 'https://profile-cms.sci.hkbu.edu.hk';
export const STRAPI_SSODiscordUrl_Local = `${backendURL_Local}/api/connect/discord`;
export const STRAPI_SSODiscordUrl_ITO = `${backendURL_ITO}/api/connect/discord`;

//SSO SECTION

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    collections: null, //Get All Other Strapi Collections - SDGS, FCRA.. etc.
    isAuthenticated: false,
    isLoading: false,
    error: null,

    sso: { //Store SSO getback things.
      jwt: null,
      username: null,
    }
  }),

  actions: {
    async login(ssoid) {

      //NEED LOGIN LOGIC.
      // if (!StrapiLogin) {
      //   return false;
      // }

      console.log("Loggin in")
      this.isLoading = true
      this.error = null

      try {
        //Get the Profile Data
        const response = await api.findProfileBySSoid(ssoid)
        if (response.data.length > 0) {
          console.log('Got the Profile from API', response);
          this.user = {}; //Init the Object
          this.user.attributes = { ...response.data[0] }; // Lets store em here

          this.collections = {};

          for (const name of collectionNames) {
            this.collections[name] = await findCollection(name);
          }

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
      // console.log(storedUser)
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