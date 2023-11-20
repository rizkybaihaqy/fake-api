import {Note} from '#model/note.js'
import {User} from '#model/user.js'
import {NumberFromString} from '#utils/codec.js'
import {DB} from '#utils/db.js'
import express from 'express'
import {Codec, Right, optional, string} from 'purify-ts'

const notes = express.Router()

notes.get('/notes', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    note: optional(string)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, Note).fetch)
    .map(({data, ...rest}) => ({
      ...rest,
      notes: data.map((note) =>
        DB(res.locals.seed, User)
          .get(note.userId)
          .map((user) => ({...note, user}))
      )
    }))
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
    .chain(({data, ...rest}) =>
      DB(res.locals.seed, User)
        .get(req.params.id)
        .map((user) => ({user, notes: data, ...rest}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((notes) => res.json(notes))
    .ifLeft((error) => res.status(400).json(error))
})

notes.get('/users/:userId/notes/:id', (req, res) => {
  Right({userId: req.params.userId, noteId: req.params.id})
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

notes.post('/users/:id/notes', (req, res) => {
  Codec.interface({
    note: string
  })
    .decode(req.body)
    .map((note) => ({...note, userId: req.params.id}))
    .chain(DB(res.locals.seed, Note).add)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((note) => res.json(note))
    .ifLeft((error) => res.status(400).json(error))
})

notes.put('/users/:userId/notes/:id', (req, res) => {
  Codec.interface({
    id: string,
    note: string,
    userId: string
  })
    .decode({...req.params, ...req.body})
    .chain(DB(res.locals.seed, Note).edit)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

notes.delete('/users/:userId/notes/:id', (req, res) => {
  res.status(200).json({id: req.params.id})
})

export {notes}
