import {Users} from '#repositories/users.js'
import {QueryParams} from '#utils/codec.js'
import express from 'express'

const users = express.Router()

users.get('/users', (req, res) => {
  QueryParams.decode(req.query)
    .chain(Users(res.locals.seed).fetch)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

export {users}
