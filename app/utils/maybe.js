import { Maybe } from "purify-ts";

/**
 * @template T
 * @param {T} data
 * @returns {Maybe<T>}
 */
export const Given = (data) => Maybe.fromNullable(data);