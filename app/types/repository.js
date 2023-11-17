/**
 * @typedef {Object} Query
 * @property {number} limit
 * @property {number} page
 * @property {string} filter
 */
/**
 * @template T
 * @typedef {Object} CollectionOf<T>
 * @param {Object.<string, any> & {foo:  number}} items
 * @property {number} total
 * @property {number} limit
 * @property {Object} page
 * @property {number} page.current
 * @property {number} page.total
 */
