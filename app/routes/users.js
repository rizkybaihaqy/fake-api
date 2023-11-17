import {Users} from '#repositories/users.js'
import {Given} from '#utils/maybe.js'
import {parsePositiveNumber} from '#utils/parser.js'
import express from 'express'
import {Just, Nothing} from 'purify-ts'

const users = express.Router()

users.get('/users', (req, res) => {
  Given(req.query.limit)
    .alt(Just('10'))
    .chain(parsePositiveNumber)
    .toEither({
      message: 'Invalid query, limit must be a number',
      status: 400
    })
    .chain((limit) =>
      Given(req.query.page)
        .alt(Just('1'))
        .chain(parsePositiveNumber)
        .map((page) => ({limit, page}))
        .toEither({
          message: 'Invalid query, page must be a number',
          status: 400
        })
    )
    .chain((query) =>
      Given(req.query.filter)
        .alt(Just(''))
        .chain((filter) =>
          typeof filter === 'string' ? Just(filter) : Nothing
        )
        .map((filter) => ({...query, filter}))
        .toEither({
          message: 'Invalid query, filter must be a string',
          status: 400
        })
    )
    .chain((query) =>
      Given(res.locals.seed)
        .map(Users)
        .map((users) => users.fetch(query))
        .toEither({
          message: 'Invalid seed',
          status: 400
        })
    )
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

export {users}
