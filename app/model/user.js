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
const createUser = (user) => user

export const User = {
  create: createUser,

  /**
   * @param {string} id
   */
  generate: (id) => {
    faker.seed(parseSeed(id))

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

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
}
