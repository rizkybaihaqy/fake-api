import {Note} from '#model/note.js'
import {User} from '#model/user.js'
import {NumberFromString} from '#utils/codec.js'
import {DB} from '#utils/db.js'
import express from 'express'
import {
  Codec,
  Either,
  Right,
  Tuple,
  optional,
  string
} from 'purify-ts'

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

notes.get('/users/:id/notes', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    note: optional(string)
  })
    .decode(req.query)
    .map((query) => ({...query, userId: req.params.id}))
    .chain(DB(res.locals.seed, Note).fetch)
    .chain((notes) =>
      DB(res.locals.seed, User)
        .get(req.params.id)
        .map((user) => ({user, ...notes}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((notes) => res.json(notes))
    .ifLeft((error) => res.status(400).json(error))
})

notes.get('/users/:userId/notes/:noteId', (req, res) => {
  Right({userId: req.params.userId, noteId: req.params.noteId})
    .chain(({noteId, userId}) =>
      DB(res.locals.seed, Note)
        .get(noteId)
        .map((note) => ({note, userId}))
    )
    .chain(({note, userId}) =>
      DB(res.locals.seed, User)
        .get(userId)
        .map((user) => ({note, user}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((data) => res.json(data))
    .ifLeft((error) => res.status(400).json(error))
})

export {notes}
