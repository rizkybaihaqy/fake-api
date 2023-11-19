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
