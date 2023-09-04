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
