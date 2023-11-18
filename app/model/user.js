import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'

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
 * @param {User} user
 */
export const createUser = (user) => user

/**
 * @param {string} id
 */
export const generateUser = (id) => {
  faker.seed(parseSeed(id))

  const firstName =
    id.split(/[._]/)[0].replace(/\d/g, '') || faker.person.firstName()
  const lastName =
    id.split(/[._]/)[1]?.replace(/\d/g, '') || faker.person.lastName()

  return createUser({
    id: id.toLowerCase(),
    firstName: firstName,
    lastName: lastName,
    email: faker.internet.email({
      firstName,
      lastName
    }),
    password: faker.internet.password({
      memorable: true
    }),
    avatar: faker.internet.avatar(),
    memberAt: faker.date.past()
  })
}
