import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'

/**
 * @typedef Note
 * @property {string} id
 * @property {string} note
 * @property {Date} createdAt
 */

/**
 * @param {Note} note
 */
const createNote = (note) => note

/**
 * @param {Note} note
 */
const emptyNote = createNote({
  id: '',
  note: '',
  createdAt: new Date()
})

export const Note = {
  create: createNote,

  generate: ({id, note}) => {
    faker.seed(parseSeed(id))

    const definitions = {
      abbreviation: faker.definitions.hacker.abbreviation,
      adjective: faker.definitions.hacker.adjective,
      ingverb: faker.definitions.hacker.ingverb,
      noun: faker.definitions.hacker.noun,
      verb: faker.definitions.hacker.verb
    }

    const definitionKeys = Object.keys(definitions)

    const matchingDefinition = definitionKeys.find((key) =>
      definitions[key].includes(note)
    )

    if (note && !matchingDefinition) {
      return emptyNote
    }

    const phrase = faker.helpers.arrayElement(
      faker.definitions.hacker.phrase
    )

    const data = {
      abbreviation: faker.hacker.abbreviation,
      adjective: faker.hacker.adjective,
      ingverb: faker.hacker.ingverb,
      noun: faker.hacker.noun,
      verb: faker.hacker.verb
    }

    if (note && matchingDefinition) {
      data[matchingDefinition] = note
    }

    return createNote({
      id: id.toLowerCase(),
      note: faker.helpers.mustache(phrase, data),
      createdAt: faker.date.past()
    })
  }
}
