

/**
 * @typedef {import('~/types/profile').Profile} Profile
 */

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
      populate: ['sdgs']
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
   * Update profile
   * @param {number} documentId
   * @param {{ academicInterests: string }} data
   * @returns {Promise<{ data: Profile }>}
   */
  async updateProfile(documentId, data) {
    const { update } = useStrapi()
    console.log("Updating", documentId, data);

    return await update('profiles', documentId, data); // Need to unwrap the data to pass to strapi for update -> else key error.
    // return await update('profiles', id, data); // Never use DAT Fake id in the table -> else not found error 404.

    // return await update('profiles', documentId, { //No need to wrap, as it is already an Object.
    //   data
    // })

  }
}
