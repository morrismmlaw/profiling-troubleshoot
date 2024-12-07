

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
    const { find } = useStrapi()
    return await find('profiles', {
      filters: {
        ssoid: {
          $eq: ssoid
        }
      }
    })
  },

  /**
   * Get Collection
   */
  async findCollection(name) {
    const { find } = useStrapi()
    const media = useStrapiMedia()

    if (name === 'sdgs') {
      console.log('MEDIA', media);
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
