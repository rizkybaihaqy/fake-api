import {Maybe, Either} from 'purify-ts'

/**
 * @template T
 * @param {(value: T) => boolean} predicate
 * @returns {(arr: T[]) => Either<Object, T>}
 */
export const find = (predicate) => (arr) =>
  Maybe.fromNullable(arr.find(predicate)).toEither('Not found')

/**
 * @template T
 * @param {(value: T) => boolean} predicate
 * @returns {(arr: T[]) => T[]}
 */
export const filter = (predicate) => (arr) => arr.filter(predicate)

/**
 * @template T
 * @param {number} limit
 * @param {() => T} callback
 * @returns {T[]}
 */
export const createUnique = (limit, callback) => {
  const value = new Set()

  while (value.size < limit) {
    value.add(callback())
  }

  return Array.from(value)
}
