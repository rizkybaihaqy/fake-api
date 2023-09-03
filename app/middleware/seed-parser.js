import {DB} from '#db.js'

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const seedParser = (req, res, next) => {
  const seed = req.params.seed
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  res.locals.DB = DB(seed)
  next()
}
