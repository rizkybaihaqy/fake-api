import {Just, Maybe, Nothing} from 'purify-ts'
import {Given} from './maybe.js'

/**
 * @param {any} value
 * @returns {Maybe<number>}
 */
export const parsePositiveNumber = (value) =>
  Given(value)
    .map(Number)
    .chain((value) => (value < 0 ? Nothing : Just(value)))
    .chain((value) => (Number.isNaN(value) ? Nothing : Just(value)))

/**
 * @param {string} seed
 * @returns {number}
 */
export const parseSeed = (seed) =>
  seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
