import {createUnique} from '#utils/array.js'
import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'
import {Left, Right} from 'purify-ts'

/**
 * @template T
 * @param {number} seed
 * @param {Object} Model
 * @param {(arg0: T) => T} Model.create
 * @param {(arg0: string) => T} Model.generate
 */
export const DB = (seed, Model) => ({
  fetch: ({limit = 10, page = 1}) => {
    faker.seed(seed)

    const totalData = Number.MAX_SAFE_INTEGER

    const totalPage = Math.ceil(totalData / limit)

    faker.seed(seed + limit + page)

    if (page > totalPage) {
      return Left(
        `Problem with the value of property \"page\": Expected a number less than ${totalPage}, but received a number with value ${page}`
      )
    }

    const users = createUnique(limit, () =>
      faker.string.nanoid()
    ).map(Model.generate)

    return Right({
      users,
      limit,
      total: totalData,
      page: {total: totalPage, current: page}
    })
  },

  /**
   * @param {string} id
   */
  get: (id) => Right(Model.generate(id)),

  add: (fields) => {
    faker.seed(seed)

    return Right(
      Model.create({
        id: faker.string.nanoid(),
        ...fields,
        createdAt: new Date()
      })
    )
  },

  edit: ({id, ...newData}) =>
    Right(Model.create({...Model.generate(id), ...newData}))
})
