import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'

/**
 * @typedef User
 * @property {string} id
 * @property {string} username
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} password
 * @property {string} avatar
 * @property {Date} createdAt
 */

/**
 * @param {User} user
 */
const createUser = (user) => user

export const User = {
  name: 'user',

  create: createUser,

  generate: ({id, username}) => {
    faker.seed(parseSeed(id))

    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return createUser({
      id,
      username: (username
        ? faker.internet.userName({
            firstName: faker.datatype.boolean()
              ? username
              : undefined,
            lastName: faker.datatype.boolean() ? username : undefined
          })
        : faker.internet.userName({
            firstName,
            lastName
          })
      ).toLowerCase(),
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
      createdAt: faker.date.past()
    })
  }
}
