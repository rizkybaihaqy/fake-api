import {seedParser, slugify} from '#lib/string.js'
import {faker} from '@faker-js/faker'
import {fpotify} from '#models/fpotify.js'

/**
 * @param {number} seed
 */
export const DB = (seed) => {
  /**
   * @param {number} page
   * @param {number} limit
   * @returns {Artist[]}
   */
  const artists = (page, limit) => {
    faker.seed(seed + page + limit)
    return Array.from({length: limit}, () => {
      const name = faker.word.words()
      return fpotify.artist(slugify(name))
    })
  }

  /**
   * @param {string} id
   * @returns {Artist}
   */
  const artist = (id) => {
    return fpotify.artist(id)
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @param {Artist} artist
   * @returns {Album[]}
   */
  const albums = (page, limit, artist) => {
    faker.seed(seed + page + limit + seedParser(artist.id))
    return Array.from({length: limit}, () => {
      const name = faker.word.words()
      return fpotify.album(slugify(name), artist)
    })
  }

  /**
   * @param {string} id
   * @param {Artist} artist
   * @returns {Album}
   */
  const album = (id, artist) => {
    return fpotify.album(id, artist)
  }

  /**
   * @param {number} page
   * @param {number} limit
   * @param {Album} album
   * @param {Artist} artist
   * @returns {Track[]}
   */
  const tracks = (page, limit, album, artist) => {
    faker.seed(
      seed +
        page +
        limit +
        seedParser(album.id) +
        seedParser(artist.id)
    )
    return Array.from({length: limit}, () => {
      const name = faker.word.words()
      return fpotify.track(slugify(name), album, artist)
    })
  }

  /**
   *
   */

  return {
    artists,
    artist,
    albums,
    album,
    tracks
  }
}
