
/**
 * @typedef {import('~/types/profile').Profile} Profile
 */


//For Get and return of Update profile.
let populateFields = [
  'sdgs', // Populate the 'sdgs' field with the related data
  'research_centres', // Populate the 'research_centres' field with the related data
  'research_foci',
  'fcras'
]

//Helper.

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

// async function updateResearch_Centres(documentId, data) {
//   const { update } = useStrapi()
//   // Assuming data.research_centres is an array of IDs of the related research centers
//   const researchCenterIds = data.research_centres.map((center) => center.id);
//   delete data.research_centres; //RELATION SPECIAL TREATMENT
//   console.log("Updating Research_Centres", documentId, researchCenterIds);
//   return await update('profiles', documentId, { research_centres: researchCenterIds });
// }

// async function updateResearch_Foci(documentId, data) {
//   const { update } = useStrapi()
//   // Assuming data.research_centres is an array of IDs of the related research centers
//   const researchFociIds = data.research_foci.map((center) => center.id);
//   delete data.research_foci; //RELATION SPECIAL TREATMENT
//   console.log("Updating Research_Foci", documentId, researchFociIds);
//   return await update('profiles', documentId, { research_foci: researchFociIds });
// }

// async function update_fcras(documentId, data) {
//   const { update } = useStrapi()
//   // Assuming data.research_centres is an array of IDs of the related research centers
//   const fcrasIds = data.fcras.map((center) => center.id);
//   delete data.fcras; //RELATION SPECIAL TREATMENT
//   console.log("Updating fcras", documentId, fcrasIds);
//   return await update('profiles', documentId, { fcras: fcrasIds });
// }


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

    //   return await find('profiles', {
    //     filters: {
    //       ssoid: {
    //         $eq: ssoid
    //       }
    //     }
    //   })
    // },

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
    console.log("Updating", documentId, data);

    await updateResearch_Centres(documentId, data); //Relations
    await updateResearch_Foci(documentId, data); //Relations
    await update_fcras(documentId, data); //Relations

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
