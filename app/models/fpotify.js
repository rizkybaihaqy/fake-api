import {seedParser, unSlugify} from '#lib/string.js'
import {faker} from '@faker-js/faker'

export const fpotify = {
  /**
   *
   * @param {string} id
   * @returns {Artist}
   */
  artist: (id) => {
    faker.seed(seedParser(id))

    return {
      id,
      name: unSlugify(id),
      genres: Array.from({length: faker.number.int(3)}, () =>
        faker.music.genre()
      ),
      image: faker.image.url()
    }
  },

  /**
   *
   * @param {string} id
   * @param {Artist} artist
   * @returns {Album}
   */
  album: (id, artist) => {
    faker.seed(seedParser(id))

    return {
      id,
      type: faker.helpers.arrayElement([
        'album',
        'single',
        'compilation'
      ]),
      name: unSlugify(id),
      image: faker.image.url(),
      releaseDate: faker.date.past(),
      artists: [artist.id]
    }
  },

  /**
   *
   * @param {string} id
   * @param {Album} album
   * @param {Artist} artist
   * @returns {Track}
   */
  track: (id, album, artist) => {
    faker.seed(seedParser(id))

    return {
      id,
      name: unSlugify(id),
      disc: 1,
      duration: faker.number.int({min: 10000, max: 300000}),
      explicit: faker.datatype.boolean(),
      number: faker.number.int({min: 1, max: 18}),
      album: album.id,
      artists: [artist.id]
    }
  }
}
