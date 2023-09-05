/**
 * @typedef {Object} Fedium
 * @property {User[]} users
 * @property {Article[]} articles
 * @property {Respons[]} responses
 * @property {Clap[]} claps
 */

/**
 * @typedef User
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} avatar
 * @property {Date} memberAt
 */

/**
 * @typedef {Object} Article
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {string} body
 * @property {string} image
 * @property {string[]} topics
 * @property {string[]} tags
 * @property {string} author
 * @property {Date} lastModifiedAt
 */

/**
 * @typedef {Object} Respons
 * @property {string} id
 * @property {string} body
 * @property {string} author
 * @property {string} article
 */

/**
 * @typedef {Object} Clap
 * @property {string} id
 * @property {string} user
 * @property {string} article
 */