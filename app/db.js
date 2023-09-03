import {faker} from '@faker-js/faker'

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

  const artists = Array.from({length: 10}, () => {
    const name = faker.word.words()

    return {
      id: faker.helpers.slugify(name),
      name,
      genres: Array.from({length: faker.number.int(3)}, () =>
        faker.music.genre()
      ),
      image: faker.image.url(),
      popularity: faker.number.int(100),
      followers: faker.number.int(1000000)
    }
  })

  const albums = Array.from({length: 100}, () => {
    const name = faker.word.words()

    return {
      id: faker.helpers.slugify(name),
      type: faker.helpers.arrayElement([
        'album',
        'single',
        'compilation'
      ]),
      name,
      // markets: Array.from({ length: faker.number.int(249) }, () =>
      //   faker.location.countryCode()
      // ),
      image: faker.image.url(),
      releaseDate: faker.date.past(),
      artists: Array.from(
        {length: faker.number.int({min: 1, max: 2})},
        () => faker.helpers.arrayElement(artists).id
      )
    }
  })

  const tracks = Array.from({length: 10000}, () => {
    const name = faker.word.words()

    return {
      id: faker.helpers.slugify(name),
      name: name,
      // markets: Array.from({ length: faker.number.int(249) }, () =>
      //   faker.location.countryCode()
      // ),
      disc: 1,
      duration: faker.number.int({min: 10000, max: 300000}),
      explicit: faker.datatype.boolean(),
      popularity: faker.number.int(100),
      number: faker.number.int({min: 1, max: 18}),
      artists: Array.from(
        {length: faker.number.int({min: 1, max: 2})},
        () => faker.helpers.arrayElement(artists).id
      ),
      album: faker.helpers.arrayElement(albums).id
    }
  })

  return {
    users,
    articles,
    responses,
    artists,
    albums,
    tracks
  }
}
