import {faker} from '@faker-js/faker'

/**
 * @param {number} seed
 * @returns {Fedium}
 */
export const Fedium = (seed) => {
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

  const responses = Array.from({length: 1000}, () => {
    return {
      id: faker.string.nanoid(),
      body: faker.lorem.paragraphs(1),
      author: faker.helpers.arrayElement(users).id
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
      claps: Array.from(
        {length: faker.number.int(10)},
        () => faker.helpers.arrayElement(users).id
      ),
      responses: Array.from(
        {length: faker.number.int(5)},
        () => faker.helpers.arrayElement(responses).id
      ),
      author: faker.helpers.arrayElement(users).id,
      lastModifiedAt: faker.date.past()
    }
  })

  return {
    users,
    articles,
    responses
  }
}
