/**
 * @template T
 * @param {{ [key: string]: string }} filterObj
 * @returns {(obj: T) => boolean}
 */
export const by = (filterObj) => (obj) => {
  const [prop, value] = Object.entries(filterObj)[0]
  return obj[prop] === value
}
