import {Given} from '#utils/maybe.js'
import {parseSeed} from '#utils/parser.js'
import {Just} from 'purify-ts'

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const seedParser = async (req, res, next) => {
  Given(req.params.seed)
    .alt(Just(''))
    .map(parseSeed)
    .ifJust((seed) => {
      res.locals.seed = seed
      next()
    })
    .ifNothing(() => {
      res.send({
        error: 'Our seed service is down, please report this',
        status: 500
      })
    })
}
