import {seedParser} from '#middleware/seed-parser.js'
import {notes} from '#routes/notes.js'
import {users} from '#routes/users.js'
import express from 'express'

const routes = express.Router({
  mergeParams: true
})

routes.use('/', seedParser)
routes.use('/', users)
routes.use('/', notes)

export {routes}
