import {User} from '#model/user.js'
import {createUnique} from '#utils/array.js'
import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'
import {Just, Maybe} from 'purify-ts'

/**
 * @param {number} seed
 */
export const Users = (seed) => ({
  /**
   * @param {Query} query
   */
  fetch: ({limit, page, filter}) => {
    faker.seed(seed + parseSeed(filter))

    const total = faker.number.int()

    faker.seed(seed + limit + page + parseSeed(filter))

    return Maybe.fromPredicate(
      (lim) => Math.ceil(total / lim) >= page,
      limit
    )
      .map((lim) =>
        createUnique(lim, () =>
          filter
            ? faker.internet.userName({firstName: filter})
            : faker.internet.userName()
        )
      )
      .map((users) => users.map(User))
      .alt(Just([]))
      .map((users) => ({
        users,
        limit,
        total: total,
        page: {total: Math.ceil(total / limit), current: page}
      }))
  },
  /**
   * @param {string} id
   * @returns {User}
   */
  get: (id) => {
    return User(id)
  }
})
