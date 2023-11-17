import {seedParser} from '#middleware/seed-parser.js'
import {users} from '#routes/users.js'
import express from 'express'

const routes = express.Router({
  mergeParams: true
})

routes.use('/', seedParser)
routes.use('/', users)

export {routes}
