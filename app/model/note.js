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

export const Note = {
  create: createNote,

  generate: ({id, note}) => {
    faker.seed(parseSeed(id))

    const phrase = faker.helpers.arrayElement(TEMPLATE)

    const data = {
      abbreviation: faker.hacker.abbreviation,
      adjective: faker.hacker.adjective,
      ingverb: faker.hacker.ingverb,
      noun: note || faker.hacker.noun,
      verb: faker.hacker.verb
    }

    return createNote({
      id: id.toLowerCase(),
      note: faker.helpers.mustache(phrase, data),
      createdAt: faker.date.past()
    })
  }
}

const TEMPLATE = [
  'Meeting with the {{adjective}} client went smoothly, discussing {{noun}} strategies and {{verb}} potential opportunities.',
  'Noted {{ingverb}} the impressive presentation on the latest {{noun}} innovations during the {{adjective}} conference.',
  '{{adjective}} brainstorming session led to valuable {{noun}} insights, fostering a collaborative {{ingverb}} environment.',
  'Outlined key {{noun}} action items and set {{adjective}} deadlines for the upcoming {{ingverb}} project.',
  'Captured creative ideas for the {{adjective}} marketing campaign, emphasizing engaging {{noun}} content and innovative {{ingverb}} techniques.',
  'Explored {{adjective}} solutions for streamlining {{noun}} processes, ensuring efficient {{ingverb}} workflows.',
  'Logged important {{noun}} data and tracked progress on the {{adjective}} development tasks, enhancing overall {{ingverb}} productivity.',
  "Summarized the team's {{adjective}} achievements and upcoming {{noun}} milestones in today's {{ingverb}} meeting.",
  'Documented insightful feedback from the {{adjective}} user testing, informing future {{noun}} design iterations and {{ingverb}} improvements.',
  'Highlighted the {{adjective}} success stories and ongoing {{ingverb}} challenges in the weekly {{noun}} status report.',
  'Explored the {{adjective}} market trends and identified {{noun}} opportunities for expansion.',
  'Conducted a {{adjective}} survey to gather {{noun}} feedback and improve user experience.',
  'Collaborated on the development of {{noun}} prototypes to test {{adjective}} design concepts.',
  'Facilitated a {{adjective}} workshop to brainstorm {{noun}} ideas and enhance team creativity.',
  'Implemented {{adjective}} strategies to optimize {{noun}} processes and increase efficiency.',
  'Reviewed the {{noun}} performance metrics and proposed {{adjective}} solutions for improvement.',
  'Captivated the audience with an {{adjective}} presentation on {{noun}} best practices and innovations.',
  'Initiated a {{adjective}} initiative to promote {{noun}} collaboration among team members.',
  'Outlined the {{adjective}} project roadmap, highlighting {{noun}} milestones and deliverables.',
  'Documented the {{noun}} analysis findings and recommended {{adjective}} actions for improvement.',
  'Implemented {{abbreviation}} to automate {{noun}} processes, resulting in increased {{verb}} efficiency.',
  'Conducted a {{adjective}} analysis and proposed {{abbreviation}} for optimizing {{noun}} workflows.',
  'Collaborated on {{abbreviation}} integration to streamline {{noun}} operations and enhance {{verb}} productivity.',
  'Facilitated a {{verb}}-oriented workshop to brainstorm {{noun}} ideas and improve {{abbreviation}} collaboration.',
  'Reviewed the {{abbreviation}} metrics and recommended {{adjective}} strategies for enhancing {{noun}} performance.',
  'Initiated a {{verb}} campaign to promote {{abbreviation}} awareness and boost {{noun}} engagement.',
  'Outlined the {{verb}} plan for {{abbreviation}} implementation, ensuring smooth {{noun}} project execution.',
  'Documented {{abbreviation}} results from user testing, providing insights for {{adjective}} design iterations.',
  'Captivated the audience with an {{abbreviation}}-packed presentation on {{verb}} best practices and {{noun}} innovations.',
  'Explored {{abbreviation}} solutions for optimizing {{noun}} processes, ensuring efficient {{verb}} workflows.'
]
