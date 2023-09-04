import {notFound} from '#error/not-found.js'
import {filter, find} from '#lib/array.js'
import {by} from '#lib/predicate.js'
import express from 'express'
import {Maybe} from 'purify-ts/Maybe'

const fedium = express.Router()

fedium.get('/users', (req, res) => {
  Maybe.fromNullable(res.locals.DB.users)
    .ifNothing(() => notFound(req, res))
    .ifJust((users) => res.json(users))
})
fedium.get('/users/:id', (req, res) => {
  /** @type {Maybe<User[]>} */
  const Users = Maybe.fromNullable(res.locals.DB.users)

  Users.chain(find(by({id: req.params.id})))
    .ifNothing(() => notFound(req, res))
    .ifJust((user) => res.json(user))
})
fedium.get('/users/:id/articles', (req, res) => {
  /** @type {Maybe<User[]>} */
  const Users = Maybe.fromNullable(res.locals.DB.users)
  /** @type {Maybe<Article[]>} */
  const Articles = Maybe.fromNullable(res.locals.DB.articles)

  Users.chain(find(by({id: req.params.id})))
    .chain((user) => Articles.map(filter(by({author: user.id}))))
    .ifNothing(() => notFound(req, res))
    .ifJust((articles) => res.json(articles))
})
fedium.get('/users/:userId/articles/:articleId', (req, res) => {
  /** @type {Maybe<User[]>} */
  const Users = Maybe.fromNullable(res.locals.DB.users)
  /** @type {Maybe<Article[]>} */
  const Articles = Maybe.fromNullable(res.locals.DB.articles)

  Users.chain(find(by({id: req.params.userId})))
    .chain((user) =>
      Articles.map(filter(by({author: user.id})))
        .chain(find(by({id: req.params.articleId})))
        .map((article) => ({...article, author: user}))
    )
    .ifNothing(() => notFound(req, res))
    .ifJust((article) => res.json(article))
})

fedium.get('/articles', (req, res) => {
  Maybe.fromNullable(res.locals.DB.articles)
    .ifNothing(() => notFound(req, res))
    .ifJust((articles) => res.json(articles))
})

export {fedium}
