import {Codec, Left, Right, string} from 'purify-ts'

export const NumberFromString = Codec.custom({
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
