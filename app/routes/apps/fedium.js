import {DB} from '#data-access/fedium.js'
import {successResponse} from '#lib/object.js'
import express from 'express'

const fedium = express.Router()

fedium.get('/users', (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const users = DB(res.locals.seed).users(page, limit)
  res.json(users)
})
fedium.get('/users/:id', (req, res) => {
  const user = DB(res.locals.seed).user(req.params.id)
  res.json(successResponse(user))
})

fedium.get('/users/:id/articles', (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const user = DB(res.locals.seed).user(req.params.id)
  const articles = DB(res.locals.seed).articles(1, 5, user)
  const totalPage = Math.ceil(Number.MAX_SAFE_INTEGER / limit)
  res.json(successResponse(articles, {page, limit, totalPage}))
})
fedium.get('/users/:userId/articles/:articleId', (req, res) => {
  const user = DB(res.locals.seed).user(req.params.userId)
  const article = DB(res.locals.seed).article(
    req.params.articleId,
    user
  )
  res.json(successResponse(article))
})
fedium.get(
  '/users/:userId/articles/:articleId/response',
  (req, res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const user = DB(res.locals.seed).user(req.params.userId)
    const article = DB(res.locals.seed).article(
      req.params.articleId,
      user
    )
    const responses = DB(res.locals.seed).responses(
      1,
      12,
      article,
      user
    )
    const totalPage = Math.ceil(Number.MAX_SAFE_INTEGER / limit)
    res.json(successResponse(responses, {page, limit, totalPage}))
  }
)
fedium.get('/users/:userId/articles/:articleId/claps', (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const user = DB(res.locals.seed).user(req.params.userId)
  const article = DB(res.locals.seed).article(
    req.params.articleId,
    user
  )
  const claps = DB(res.locals.seed).claps(1, 12, article, user)

  const totalPage = Math.ceil(Number.MAX_SAFE_INTEGER / limit)
  res.json(successResponse(claps, {page, limit, totalPage}))
})

fedium.get('/articles', (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10

  const articles = DB(res.locals.seed).articles(1, 10, null)
  const totalPage = Math.ceil(Number.MAX_SAFE_INTEGER / limit)
  res.json(successResponse(articles, {page, limit, totalPage}))
})

export {fedium}
