import {seedParser, unSlugify} from '#lib/string.js'
import {faker} from '@faker-js/faker'

export const fedium = {
  /**
   *
   * @param {string} id
   * @returns {User}
   */
  user: (id) => {
    faker.seed(seedParser(id))

    const firstName =
      id.split(/[._]/)[0].replace(/\d/g, '') ||
      faker.person.firstName()
    const lastName =
      id.split(/[._]/)[1]?.replace(/\d/g, '') ||
      faker.person.lastName()

    return {
      id,
      firstName,
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
  },

  /**
   *
   * @param {string} id
   * @param {User} user
   * @returns {Article}
   */
  article: (id, user) => {
    faker.seed(seedParser(id))

    return {
      id,
      title: unSlugify(id),
      subtitle: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(10),
      image: faker.image.url(),
      topics: Array.from({length: faker.number.int(3)}, () =>
        faker.company.catchPhraseAdjective()
      ),
      tags: Array.from({length: faker.number.int(3)}, () =>
        faker.company.catchPhraseDescriptor()
      ),
      author: user.id,
      lastModifiedAt: faker.date.past()
    }
  },

  /**
   *
   * @param {string} userId
   * @param {Article} article
   * @returns {Respons}
   */
  response: (userId, article) => {
    faker.seed(seedParser(userId) + seedParser(article.id))

    return {
      id: faker.string.nanoid(),
      body: `${faker.word.interjection()}! ${faker.word.verb()} ${faker.word.adjective()}!`,
      article: article.id,
      author: userId
    }
  },

  /**
   * @param {string} userId
   * @param {Article} article
   * @returns {Clap}
   */
  clap: (userId, article) => {
    faker.seed(seedParser(userId) + seedParser(article.id))

    return {
      id: faker.string.nanoid(),
      article: article.id,
      user: userId
    }
  }
}
