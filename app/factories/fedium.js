import {faker} from '@faker-js/faker'

/**
 * @param {number} seed
 * @returns {Fedium}
 */
export const DB = (seed) => {
  faker.seed(seed)

  const users = Array.from({length: 10}, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
      id: faker.internet.userName({firstName, lastName}),
      firstName,
      lastName,
      email: faker.internet.email({firstName, lastName}),
      password: faker.internet.password({memorable: true}),
      avatar: faker.internet.avatar(),
      memberAt: faker.date.past()
    }
  })

  const articles = Array.from({length: 100}, () => {
    const title = `${faker.company.catchPhrase()} ${faker.company.buzzPhrase()}`

    return {
      id: faker.helpers.slugify(title),
      title,
      subtitle: faker.lorem.sentence(),
      body: faker.lorem.paragraphs(10),
      image: faker.image.url(),
      topics: Array.from({length: faker.number.int(3)}, () =>
        faker.company.catchPhraseAdjective()
      ),
      tags: Array.from({length: faker.number.int(3)}, () =>
        faker.company.catchPhraseDescriptor()
      ),
      author: faker.helpers.arrayElement(users).id,
      lastModifiedAt: faker.date.past()
    }
  })

  const responses = Array.from({length: 1000}, () => {
    return {
      id: faker.string.nanoid(),
      body: `${faker.word.interjection()}! ${
        faker.word.verb()
      } ${faker.word.adjective()}!`,
      author: faker.helpers.arrayElement(users).id,
      article: faker.helpers.arrayElement(articles).id
    }
  })

  const claps = Array.from({length: 10000}, () => {
    return {
      id: faker.string.nanoid(),
      user: faker.helpers.arrayElement(users).id,
      article: faker.helpers.arrayElement(articles).id
    }
  })

  return {
    users,
    articles,
    responses,
    claps
  }
}
