/**
 * @typedef {import('~/types/profile').Profile} Profile
 */

import { backendURL_ITO, useAuthStore } from '~/composables/useAuth';

//For Get and return of Update profile (inside, not api collection.).
let populateFields = [
  'sdgs', // Populate the 'sdgs' field with the related data
  'research_centres', // Populate the 'research_centres' field with the related data
  'research_foci',
  'fcras',
  'available_supervisions',
  'departments',
  'uploadPhoto',
  'tech_offers',
]

//Helper.

/**
 * Updates a relation field in a profile document in the Strapi API.
 *
 * @async
 * @function updateRelationField
 * @param {string} documentId - The ID of the profile document to update.
 * @param {Object} data - The data object containing the updated relation field.
 * @param {string} field - The name of the relation field in FORMData to update.
 * @returns {Promise<Object>} A promise that resolves with the updated profile document.
 */
async function updateRelationFieldJWT(documentId, data, field) {

  const authStore = useAuthStore();
  const token = authStore.sso.jwt;

  const fieldIds = data[field].map((item) => item.id);
  delete data[field];
  console.log(`Updating ${field}`, documentId, fieldIds);

  const { update } = useStrapi();
  return await update('profiles', documentId, { [field]: fieldIds });

  // JWT Request API.
  // return await fetch(`${backendURL_ITO}/api/profiles/${documentId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`,
  //   },
  //   body: { [field]: fieldIds },
  // })
  //   .then(response => {
  //     // Handle success.
  //     console.log('Response: ', response);
  //   })
  //   .catch(error => {
  //     // Handle error.
  //     console.log('An error occurred:', error.response);
  //   });

}

async function updateResearch_Centres(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'research_centres');
}

async function updateResearch_Foci(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'research_foci');
}

async function update_fcras(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'fcras');
}

async function update_available_supervisions(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'available_supervisions');
}

async function update_departments(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'departments');
}

async function update_tech_offers(documentId, data) {
  return await updateRelationFieldJWT(documentId, data, 'tech_offers');
}

/**
 * Link the Media ID with the Profile's field, remove media Linkage if needed. 
 * @param {*} documentId 
 * @param {*} data 
 * @param {*} hasChangedImage -> Determin If this Image has not changed -> no need to delete. 
 * @returns 
 */
async function update_uploadPhoto(documentId, data, profile, hasChangedImage) {
  const { update, findOne } = useStrapi();
  const profileData = profile.attributes;

  console.log("In Update uploadPhoto");
  console.log(documentId)
  console.log(data)
  console.log(profileData)

  const field = 'uploadPhoto';
  const fieldIds = data[field]
  console.log('fieldID,', fieldIds);

  //Cleanup Replacing Image
  if (fieldIds !== null && profileData[field] !== null) {
    console.log("Remove Image from STRAPI")
    const { delete: _delete } = useStrapi();

    console.log(profileData[field].id);

    //Need to check if no image replaced -> No action.
    if (hasChangedImage === true) { //IF changed
      try {
        const delResponse = await _delete('upload/files', profileData[field].id);
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (fieldIds === "" || fieldIds === null) {
    //Case Clear uploadPhoto
    // console.log("Remove Image from STRAPI")
    // const { delete: _delete } = useStrapi();
    // const delResponse = await _delete('upload/files', profileData[field].id);
  } else {
    console.log(`Updating ${field}`, documentId, fieldIds);
    return await update('profiles', documentId, { [field]: fieldIds });
  }

}

export const api = {

  /**
   * Find profile by SSOID
   * @param {string} ssoid
   * @returns {Promise<{ data: Profile[] }>}
   */
  async findProfileBySSoid(ssoid) {
    const { findOne } = useStrapi()

    return await findOne('profiles', { //Need to use Populate to fetch relationship && Media Type Data.
      where: { 'ssoid': ssoid },
      populate: populateFields
    })
  },

  /**
   * Get a collection based on the name provided.
   *
   * @param {string} name - The name of the collection to retrieve.
   * @returns {Promise<Object>} A Promise that resolves to the collection data.
   *
   * @example
   * // Get the 'sdgs' collection with the 'iconweb' URL populated
   * findCollection('sdgs')
   *   .then(data => {
   *     console.log(data[0].iconweb.url);
   *     // Output: /uploads/E_WEB_Goal_04_1779e135aa.png
   *     // Need to Later Fix to to be: http://158.182.151.62:1337/uploads/E_WEB_Goal_04_1779e135aa.png
   *   })
   *   .catch(error => {
   *     console.error('Error:', error);
   *   });
   */
  async findCollection(name) {
    const { find } = useStrapi()

    if (name === 'sdgs') {
      // console.log('POPULATE sdgs - Media Link');
      return await find(name, {
        populate: ['iconweb']
      });
    }

    return await find(name);
  },

  /**
   * Update profile // GOTTA POPULATE...
   * 
   * @param {number} documentId
   * @param {{ academicInterests: string }} FormData
   * @returns {Promise<{ data: Profile }>}
   */
  async updateProfile(documentId, FormData, profile, hasChangedImage) {
    const { update } = useStrapi()
    console.log("Updating PROFILE API JS", documentId, FormData);

    await updateResearch_Centres(documentId, FormData); //Relations
    await updateResearch_Foci(documentId, FormData); //Relations
    await update_fcras(documentId, FormData); //Relations
    await update_available_supervisions(documentId, FormData); //Relations
    await update_departments(documentId, FormData); //Relations

    await update_tech_offers(documentId, FormData); //Relations

    //Check if There is a new Photo
    //Yes Run Below..
    await update_uploadPhoto(documentId, FormData, profile, hasChangedImage); //MEDIA ID
    // delete FormData.uploadPhoto;

    return await update('profiles', documentId, FormData,
      { populate: populateFields } //Return the Populated data.
    );

    // Need to unwrap the data to pass to strapi for update -> else key error.
    // return await update('profiles', id, data); // Never use DAT Fake id in the table -> else not found error 404.

    // return await update('profiles', documentId, { //No need to wrap, as it is already an Object.
    //   data
    // })
  },


  /**
   * Fetches the current user's data from the backend API.
   * @param {string} token - The JWT token of the current user.
   * @returns {Promise<Object>} A promise that resolves to the user data fetched from the API.
   */
  async getUserJWT(token) {
    // Request API.
    return await fetch(`${backendURL_ITO}/api/users/me?populate=role`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async response => {
        // Handle success.
        return await response.json();
      })
      .catch(error => {
        // Handle error.
        console.error('An error occurred:', error.response);
        throw error;
      });
  }

}
