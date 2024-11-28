/**
 * @typedef {import('~/types/profile').Profile} Profile
 */

export const StorageKeys = {
  USER: 'user'
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
  }
}