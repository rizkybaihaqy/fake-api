import express from 'express'
import {seedParser} from '#middleware/seed-parser.js'
import {fedium} from './apps/fedium.js'
import {fpotify} from './apps/fpotify.js'

const api = express.Router({
  mergeParams: true
})

api.use('/', seedParser)
api.use('/fedium', fedium)
api.use('/fpotify', fpotify)

export {api}
