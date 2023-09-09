import {createUnique} from '#lib/array.js'
import {seedParser, slugify} from '#lib/string.js'
import {fedium} from '#models/fedium.js'
import {faker} from '@faker-js/faker'

/**
 * @param {number} seed
 */
export const DB = (seed) => {
  /**
   * @param {number} page
   * @param {number} limit
   * @returns {CollectionOf<User[]>}
   */
  const users = (page, limit) => {
    faker.seed(seed + page + limit)

    const totalPage = Math.ceil(Number.MAX_SAFE_INTEGER / limit)

    if (page > totalPage) {
      return {
        items: [],
        limit: 0,
        total: Number.MAX_SAFE_INTEGER,
        page: {current: page, total: totalPage}
      }
    }

    return {
      users: createUnique(limit, faker.internet.userName).map(
        (username) => {
          return fedium.user(username)
        }
      ),
      limit,
      total: Number.MAX_SAFE_INTEGER,
      page: {current: page, total: totalPage}
    }
  }

  /**
   * @param {string} id
   * @returns {User}
   */
  const user = (id) => {
    return fedium.user(id)
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @param {User} user
   * @returns {Article[]}
   */
  const articles = (page, limit, user) => {
    faker.seed(seed + page + limit + seedParser(user.id))
    return Array.from(
      {length: limit},
      () =>
        `${faker.company.catchPhrase()} ${faker.company.buzzPhrase()}`
    ).map((title) => fedium.article(slugify(title), user))
  }

  /**
   * @param {string} id
   * @param {User} user
   * @returns {Article}
   */
  const article = (id, user) => {
    return fedium.article(id, user)
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @param {Article} article
   * @param {User} user
   * @returns {Respons[]}
   */
  const responses = (page, limit, article, user) => {
    faker.seed(
      seed +
        page +
        limit +
        seedParser(article.id) +
        seedParser(user.id)
    )
    return Array.from({length: limit}, () =>
      faker.internet.userName()
    ).map((username) => fedium.response(username, article))
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @param {Article} article
   * @param {User} user
   * @returns {Clap[]}
   */
  const claps = (page, limit, article, user) => {
    faker.seed(
      seed +
        page +
        limit +
        seedParser(article.id) +
        seedParser(user.id)
    )
    return Array.from({length: faker.number.int(100)}, () =>
      faker.internet.userName()
    ).map((username) => fedium.clap(username, article))
  }

  return {
    users,
    user,
    articles,
    article,
    responses,
    claps
  }
}
