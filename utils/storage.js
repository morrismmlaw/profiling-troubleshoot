/**
 * @typedef {import('~/types/profile').Profile} Profile
 */

export const StorageKeys = {
  USER: 'user',
  COLLECTIONS: 'collections',
  STATE: 'state'
}

export const storage = {
  /**
   * Get user from localStorage
   * @returns {Profile|null}
   */
  getUser: () => {
    const stored = localStorage.getItem(StorageKeys.USER)
    return stored ? JSON.parse(stored) : null
  },

  /**
   * Set user in localStorage
   * @param {Profile|null} user
   * @returns {void}
   */
  setUser: (user) => {
    if (user) {
      localStorage.setItem(StorageKeys.USER, JSON.stringify(user))
    } else {
      localStorage.removeItem(StorageKeys.USER)
    }
  },

  getCollection: () => {
    const stored = localStorage.getItem(StorageKeys.COLLECTIONS);
    return stored ? JSON.parse(stored) : null;
  },

  setCollection: (collection) => {
    if (collection) {
      localStorage.setItem(StorageKeys.COLLECTIONS, JSON.stringify(collection));
    } else {
      localStorage.removeItem(StorageKeys.COLLECTIONS);
    }
  },

  getState: () => {
    const stored = localStorage.getItem(StorageKeys.STATE)
    return stored ? JSON.parse(stored) : null
  },

  /**
   * Set user in localStorage
   * @param {Profile|null} state
   * @returns {void}
   */
  setState: (state) => {
    if (state) {
      localStorage.setItem(StorageKeys.STATE, JSON.stringify(state))
    } else {
      localStorage.removeItem(StorageKeys.STATE)
    }
  },

}