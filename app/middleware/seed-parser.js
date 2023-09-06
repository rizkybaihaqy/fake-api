/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export const seedParser = async (req, res, next) => {
  const app = req.url.split('/')[1]

  const seed = req.params.seed
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)

  res.locals.seed = seed
  next()
  // try {
  //   const {DB} = await import(`#factories/${app}.js`)

  //   res.locals.DB = DB(seed)
  //   next()
  // } catch (error) {
  //   next(error)
  // }
}
