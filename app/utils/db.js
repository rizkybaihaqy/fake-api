import {createUnique} from '#utils/array.js'
import {faker} from '@faker-js/faker'
import {Left, Maybe, Right} from 'purify-ts'
import {parseSeed} from './parser.js'

/**
 * @template T
 * @param {number} seed
 * @param {Object} Model
 * @param {string} Model.name
 * @param {(arg0: T) => T} Model.create
 * @param {(arg0: { id: any, [key: string]: any }) => T} Model.generate
 */
export const DB = (seed, Model) => ({
  fetch: ({_limit = 10, _page = 1, ...fields}) => {
    faker.seed(
      seed +
        parseSeed(Model.name) +
        parseSeed(Object.entries(fields).join(''))
    )

    const totalData = Object.keys(fields).length
      ? faker.number.int(10000000)
      : Number.MAX_SAFE_INTEGER

    const totalPage = Math.ceil(totalData / _limit)

    faker.seed(
      seed +
        _limit +
        _page +
        parseSeed(Model.name) +
        parseSeed(Object.entries(fields).join(''))
    )

    if (_page > totalPage) {
      return Left(
        `Problem with the value of property \"page\": Expected a number less than ${totalPage}, but received a number with value ${_page}`
      )
    }

    const data = createUnique(_limit, () => faker.string.nanoid())
      .map((id) => Model.generate({id: id, ...fields}))
      .map((data) => (Object.values(data).includes('') ? null : data))
      .filter((data) => data)

    return Right({
      data,
      limit: _limit,
      total: totalData,
      page: {total: totalPage, current: _page}
    })
  },

  /**
   * @param {string} id
   */
  get: (id) =>
    Maybe.fromPredicate((id) => /^[a-zA-Z0-9_-]{21}$/.test(id), id)
      .toEither(`Invalid ${Model.name} id`)
      .map((id) => Model.generate({id})),

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
    Right(Model.create({...Model.generate({id}), ...newData}))
})
