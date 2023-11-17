import {User} from '#model/user.js'
import {createUnique} from '#utils/array.js'
import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'
import {Left, Right} from 'purify-ts'

/**
 * @param {number} seed
 */
export const Users = (seed) => ({
  fetch: ({limit = 10, page = 1, filter = ''}) => {
    faker.seed(seed + parseSeed(filter))

    const totalData = filter
      ? faker.number.int(2786962000)
      : Number.MAX_SAFE_INTEGER

    const totalPage = Math.ceil(totalData / limit)

    faker.seed(seed + limit + page + parseSeed(filter))

    if (page > totalPage) {
      return Left(
        `Problem with the value of property \"page\": Expected a number less than ${totalPage}, but received a number with value ${page}`
      )
    }

    const users = createUnique(limit, () =>
      filter
        ? faker.internet.userName({firstName: filter})
        : faker.internet.userName()
    ).map(User)

    return Right({
      users,
      limit,
      total: totalData,
      page: {total: totalPage, current: page}
    })
  },
  /**
   * @param {string} id
   * @returns {User}
   */
  get: (id) => {
    return User(id)
  }
})
