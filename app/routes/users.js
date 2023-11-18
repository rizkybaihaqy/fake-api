import {User} from '#model/user.js'
import {DB} from '#repositories/users.js'
import {NumberFromString} from '#utils/codec.js'
import express from 'express'
import {Codec, Right, optional, string} from 'purify-ts'

const users = express.Router()

users.get('/users', (req, res) => {
  Codec.interface({
    limit: optional(NumberFromString),
    page: optional(NumberFromString)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, User).fetch)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

users.get('/users/:id', (req, res) => {
  Right(req.params.id)
    .chain(DB(res.locals.seed, User).get)
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

users.post('/users', (req, res) => {
  Codec.interface({
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    avatar: string
  })
    .decode(req.body)
    .chain(DB(res.locals.seed, User).add)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

users.put('/users/:id', (req, res) => {
  Codec.interface({
    id: string,
    firstName: optional(string),
    lastName: optional(string),
    email: optional(string),
    password: optional(string),
    avatar: optional(string)
  })
    .decode({...req.params, ...req.body})
    .chain(DB(res.locals.seed, User).edit)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

users.delete('/users/:id', (req, res) => {
  res.status(200).json({id: req.params.id})
})

export {users}
