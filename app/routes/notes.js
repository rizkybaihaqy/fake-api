import {DB} from '#utils/db.js'
import {NumberFromString} from '#utils/codec.js'
import express from 'express'
import {Codec, Right, optional, string} from 'purify-ts'
import {Note} from '#model/note.js'

const notes = express.Router()

notes.get('/notes', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    note: optional(string)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, Note).fetch)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((notes) => res.json(notes))
    .ifLeft((error) => res.status(400).json(error))
})

export {notes}
