import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'

/**
 *
 * @param {User | string} userOrId
 * @returns {User}
 */
export const User = (userOrId) => {
  const id =
    typeof userOrId === 'string'
      ? userOrId
      : faker.internet.userName({
          firstName: userOrId?.firstName,
          lastName: userOrId?.firstName
        })

  faker.seed(parseSeed(id))

  const firstName =
    id.split(/[._]/)[0].replace(/\d/g, '') || faker.person.firstName()
  const lastName =
    id.split(/[._]/)[1]?.replace(/\d/g, '') || faker.person.lastName()

  return {
    id: id.charAt(0).toUpperCase() + id.slice(1),
    firstName: firstName,
    lastName,
    email: faker.internet.email({
      firstName,
      lastName
    }),
    password: faker.internet.password({
      memorable: true
    }),
    avatar: faker.internet.avatar(),
    memberAt: faker.date.past()
  }
}
