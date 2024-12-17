/**
 * @typedef {import('~/types/profile').Profile} Profile
 */

//For Get and return of Update profile (inside, not api collection.).
let populateFields = [
  'sdgs', // Populate the 'sdgs' field with the related data
  'research_centres', // Populate the 'research_centres' field with the related data
  'research_foci',
  'fcras',
  'available_supervisions',
  'departments',
  'uploadPhoto',
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
async function updateRelationField(documentId, data, field) {
  const { update } = useStrapi();
  const fieldIds = data[field].map((item) => item.id);
  delete data[field];

  console.log(`Updating ${field}`, documentId, fieldIds);

  return await update('profiles', documentId, { [field]: fieldIds });
}

async function updateResearch_Centres(documentId, data) {
  return await updateRelationField(documentId, data, 'research_centres');
}

async function updateResearch_Foci(documentId, data) {
  return await updateRelationField(documentId, data, 'research_foci');
}

async function update_fcras(documentId, data) {
  return await updateRelationField(documentId, data, 'fcras');
}

async function update_available_supervisions(documentId, data) {
  return await updateRelationField(documentId, data, 'available_supervisions');
}

async function update_departments(documentId, data) {
  return await updateRelationField(documentId, data, 'departments');
}

async function update_photoUpload(documentId, data) {

  console.log("In Update photoUpload");
  console.log(documentId)
  console.log(data)
  // Upload to STRAPI UPLOAD Endpoint - Done by ProfileImage.vue
  // Store the retuned id to the Field in Profile.
  return await updateRelationField(documentId, data, 'uploadPhoto');
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
      console.log('POPULATE sdgs - Media Link');
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
   * @param {{ academicInterests: string }} data
   * @returns {Promise<{ data: Profile }>}
   */
  async updateProfile(documentId, data) {
    const { update } = useStrapi()
    console.log("Updating PROFILE API JS", documentId, data);

    await updateResearch_Centres(documentId, data); //Relations
    await updateResearch_Foci(documentId, data); //Relations
    await update_fcras(documentId, data); //Relations
    await update_available_supervisions(documentId, data); //Relations
    await update_departments(documentId, data); //Relations

    await update_photoUpload(documentId, data); //Relations

    return await update('profiles', documentId, data,
      { populate: populateFields } //Return the Populated data.
    );

    // Need to unwrap the data to pass to strapi for update -> else key error.
    // return await update('profiles', id, data); // Never use DAT Fake id in the table -> else not found error 404.

    // return await update('profiles', documentId, { //No need to wrap, as it is already an Object.
    //   data
    // })
  }
}
