/**
 * @file composables/useAuth.js
 * @description This file contains the Pinia store for handling authentication and data fetching.
 * @author Chan Hok Ting
 * @date 2024-12-15
 */

import { defineStore } from 'pinia'
import { storage } from '~/utils/storage'
import { api } from '~/utils/api'
import { useProfileStore } from './useProfile';
import ProfileSave from '~/components/ui/ProfileSave.vue';

// const { login } = useStrapiAuth();

const collectionNames = [
  'departments',
  'research-centres',
  'research-outputs',
  'research-foci',
  'sdgs',
  'fcras',
  'available-supervisions',
  'tech-offers'
];

// Function to get all other collections type from Strapi
async function findCollection(collectionName) {

  try {
    const response = await api.findCollection(collectionName);
    if (response.data.length > 0) {
      console.log(`Got the ${collectionName} data`, response.data);
      if (collectionName === 'research-outputs') {
        var sort_data = response.data.sort((a, b) =>  a.title.localeCompare(b.title));
      }else if (collectionName === 'sdgs') {
        var sort_data = response.data.sort((a, b) =>  a.sdgid.localeCompare(b.sdgid));
      }else{
        var sort_data = response.data.sort((a, b) =>  a.name.localeCompare(b.name));
      }
      // Handle the response data as needed for the specific collection
      console.log(`sorted ${collectionName} data`, sort_data);
      return sort_data;
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
export const STRAPI_SSOGoogleUrl_ITO = `${backendURL_ITO}/api/connect/google`;

export const STRAPI_SSOHKBUUrl_Local = `${backendURL_Local}/api/connect/hkbu`;
export const STRAPI_SSOHKBUUrl_ITO = `${backendURL_ITO}/api/connect/hkbu`;
export const STRAPI_SSOHKBU_UAT_Url_ITO = `${backendURL_ITO}/api/connect/hkbu-uat`;

//SSO SECTION

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    UATuser: null,

    profiles: null, //Store the fetched Profiles From STRAPI -> Meilisearch need Morris's work. 

    collections: null, //Get All Other Strapi Collections - SDGS, FCRA.. etc.
    isLogin: false,

    isAuthenticated: false, //Retrieved User Role from STRAPI.
    isAdmin: false, //Retrieved User Role from STRAPI.
    isLoading: false,
    error: null,

    //Shall check if this account is academic staff or admin user.
    sso: { //Store SSO getback things.
      provider: null,
      jwt: null,
      username: null,
    }
  }),
  actions: {
    async setCollections() {
      try {
        this.collections = {};
        for (const name of collectionNames) {
          this.collections[name] = await findCollection(name);
        }
        storage.setCollection(this.collections);
        return true;
      } catch (error) {
        console.error('Error setting collections:', error);
        return false;
      }
    },

    // Need to implement auth Logic.
    // First -> SSO-JWT -> 
    /**
     * Need to Enable Users-permissions in Admin Panel.
     */
    async setUser() {
      //Get the user isAdmin or not..
      // console.log(this.sso.jwt);
      const user = await api.getUserJWT(this.sso.jwt);
      // console.log(user);
      this.isAdmin = (user.role.type === 'admin');
      this.isAuthenticated = (user.role.type === 'authenticated');
      this.isLogin = true;

      if (user.provider === 'hkbu') {
        this.sso.ssoid = user.email.split('@')[0];
      }
    },

    async setSSO() {
      //Update Pinia
      console.log("Got the state", this.$state);
      console.log("Got the User", this.user);
      console.log("Got the Collections", this.collections);
      storage.setState(this.$state)
      storage.setUser(this.user)
      storage.setCollection(this.collections)
    },

    async setProfile(ssoid) {
      //ASSUME SSOID is the string before @.
      //Check with STRAPI User status..
      //If is admin / if is academic staff.

      //NEED LOGIN LOGIC.
      // if (!StrapiLogin) {
      //   return false;
      // }
      // console.log("Loggin in", ssoid)

      console.log("Setting Profile", ssoid, typeof ssoid)

      this.isLoading = true
      this.error = null
      try {
        //Get the Profile Data
        const response = await api.findProfileBySSoid(ssoid)
        console.log('>>>>>>>>>>>>>> Got the Profile from API',response)
        if (response !== null) {
          //Set auth State
          this.user = {}; //Init the Object
          this.user.attributes = { ...response }; // Lets store em here

          this.collections = {};

          for (const name of collectionNames) {
            this.collections[name] = await findCollection(name);
          }

          this.setSSO();
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
      this.$reset();

      if (this.sso.provider === 'google') {
        //Logout of google Service in this site.
      }

      localStorage.removeItem('jwt');
      localStorage.removeItem('username');

      storage.setUser(null)
      storage.setState(null)
      storage.setCollection(null)

      window.location.href('/');
    },

    initializeFromStorage() {
      console.log('Initializing from storage...');
      const storedState = storage.getState();
      this.$state = storedState;
    }
  }
})