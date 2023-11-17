import {Codec, Left, Right, optional, string} from 'purify-ts'

const NumberFromString = Codec.custom({
  decode: (input) =>
    string
      .decode(input)
      .map(Number)
      .chain((num) =>
        Number.isNaN(num)
          ? Left(
              `Expected a number, but received a string with value "${input}"`
            )
          : Right(num)
      ),
  encode: (input) => input.toString()
})

export const QueryParams = Codec.interface({
  limit: optional(NumberFromString),
  page: optional(NumberFromString),
  filter: optional(string)
})
