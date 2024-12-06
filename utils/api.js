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
   * Update profile
   * @param {number} id
   * @param {{ academicInterests: string }} data
   * @returns {Promise<{ data: Profile }>}
   */
  async updateProfile(id, data) {
    const { update } = useStrapi()
    console.log("Updating", id, data);

    return await update('profiles', id, data); // Need to unwrap the data to pass to strapi for update -> else key error.

    // return await update('profiles', id, {...data}); // Need to unwrap the data to pass to strapi for update -> else key error.

    // return await update('profiles', id, {
    //   data
    // })

  }
}