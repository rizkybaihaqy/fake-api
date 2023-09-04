import {Maybe} from 'purify-ts'

/**
 * @template T
 * @param {(value: T) => boolean} predicate
 * @returns {(arr: T[]) => Maybe<T>}
 */
export const find = (predicate) => (arr) =>
  Maybe.fromNullable(arr.find(predicate))

/**
 * @template T
 * @param {(value: T) => boolean} predicate
 * @returns {(arr: T[]) => T[]}
 */
export const filter = (predicate) => (arr) => arr.filter(predicate)
