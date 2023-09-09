/**
 * @template T
 * @param {T} data
 * @param {Pagination} [pagination]
 * @return {AppSuccess<T>}
 */
export const successResponse = (data, pagination) => {
  return {
    type: Array.isArray(data) ? 'array' : 'object',
    data,
    pagination,
    ok: true,
    timeStamp: new Date().toISOString()
  }
}

/**
 * @param {string} message
 * @return {AppError}
 */
export const errorResponse = (message) => {
  return {
    error: message,
    ok: true,
    timeStamp: new Date().toISOString()
  }
}
