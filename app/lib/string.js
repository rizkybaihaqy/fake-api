/**
 * @param {string} str
 * @returns {number}
 */
export const seedParser = (str) =>
  str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

/**
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

/**
 * @param {string} str
 * @returns {string}
 */
export const unSlugify = (str) =>
  str
    .replace(/-/g, ' ')
    .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase())
