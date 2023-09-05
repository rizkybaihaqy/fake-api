import express from 'express'
import {Either} from 'purify-ts'
import {Maybe} from 'purify-ts/Maybe'

const fedium = express.Router()

/**
 * @param {Object} locals
 * @returns {Either<AppError, Fedium>}
 */
const Given = (locals) =>
  Maybe.fromNullable(locals.DB).toEither({
    message: 'Something went wrong with the middleware',
    status: 500
  })

/**
 * @param {Fedium} DB
 * @returns {Either<AppError, User[]>}
 */
const getUsers = (DB) =>
  Maybe.fromNullable(DB.users).toEither({
    message: 'Something went wrong with the factory',
    status: 500
  })

/**
 * @param {string} id
 * @returns {(users: User[]) => Either<AppError, User>}
 */
const getUser = (id) => (users) =>
  Maybe.fromNullable(users.find((user) => user.id === id)).toEither({
    message: `User with id ${id} not found`,
    status: 404
  })

/**
 * @param {Fedium} DB
 * @returns {Either<AppError, Article[]>}
 */
const getArticles = (DB) =>
  Maybe.fromNullable(DB.articles).toEither({
    message: 'Something went wrong with the factory',
    status: 500
  })

/**
 * @param {string} id
 * @returns {(articles: Article[]) => Either<AppError, Article>}
 */
const getArticle = (id) => (articles) =>
  Maybe.fromNullable(
    articles.find((article) => article.id === id)
  ).toEither({
    message: `Article with id ${id} not found`,
    status: 404
  })

/**
 * @param {Fedium} DB
 * @returns {Either<AppError, Respons[]>}
 */
const getResponses = (DB) =>
  Maybe.fromNullable(DB.responses).toEither({
    message: 'Something went wrong with the factory',
    status: 500
  })

/**
 * @param {Fedium} DB
 * @returns {Either<AppError, Clap[]>}
 */
const getClaps = (DB) =>
  Maybe.fromNullable(DB.claps).toEither({
    message: 'Something went wrong with the factory',
    status: 500
  })

fedium.get('/users', (req, res) => {
  Given(res.locals)
    .chain(getUsers)
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((users) => res.json(users))
})
fedium.get('/users/:id', (req, res) => {
  Given(res.locals)
    .chain(getUsers)
    .chain(getUser(req.params.id))
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((users) => res.json(users))
})
fedium.get('/users/:id/articles', (req, res) => {
  Given(res.locals)
    .chain(getUsers)
    .chain(getUser(req.params.id))
    .chain((user) =>
      Given(res.locals)
        .chain(getArticles)
        .map((articles) =>
          articles.filter((article) => article.author === user.id)
        )
        .map((articles) => ({...user, articles}))
    )
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((users) => res.json(users))
})
fedium.get('/users/:userId/articles/:articleId', (req, res) => {
  Given(res.locals)
    .chain(getUsers)
    .chain(getUser(req.params.userId))
    .chain((user) =>
      Given(res.locals)
        .chain(getArticles)
        .map((articles) =>
          articles.filter((article) => article.author === user.id)
        )
        .chain(getArticle(req.params.articleId))
        .map((article) => ({...article, author: user}))
    )
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((users) => res.json(users))
})
fedium.get(
  '/users/:userId/articles/:articleId/response',
  (req, res) => {
    Given(res.locals)
      .chain(getUsers)
      .chain(getUser(req.params.userId))
      .chain((user) =>
        Given(res.locals)
          .chain(getArticles)
          .map((articles) =>
            articles.filter((article) => article.author === user.id)
          )
          .chain(getArticle(req.params.articleId))
      )
      .chain((article) =>
        Given(res.locals)
          .chain(getResponses)
          .map((responses) =>
            responses.filter(
              (response) => response.article === article.id
            )
          )
      )
      .map((responses) =>
        responses.map((response) =>
          Given(res.locals)
            .chain(getUsers)
            .chain(getUser(response.author))
            .map((user) => ({...response, author: user}))
        )
      )
      .ifLeft((error) => res.status(error.status).json(error))
      .ifRight((responses) => res.json(responses))
  }
)
fedium.get('/users/:userId/articles/:articleId/claps', (req, res) => {
  Given(res.locals)
    .chain(getUsers)
    .chain(getUser(req.params.userId))
    .chain((user) =>
      Given(res.locals)
        .chain(getArticles)
        .map((articles) =>
          articles.filter((article) => article.author === user.id)
        )
        .chain(getArticle(req.params.articleId))
    )
    .chain((article) =>
      Given(res.locals)
        .chain(getClaps)
        .map((claps) =>
          claps.filter((clap) => clap.article === article.id)
        )
    )
    .map((claps) =>
      claps.map((clap) =>
        Given(res.locals)
          .chain(getUsers)
          .chain(getUser(clap.user))
          .map((user) => ({...clap, author: user}))
      )
    )
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((responses) => res.json(responses))
})

fedium.get('/articles', (req, res) => {
  Given(res.locals)
    .chain(getArticles)
    .ifLeft((error) => res.status(error.status).json(error))
    .ifRight((articles) => res.json(articles))
})

export {fedium}
