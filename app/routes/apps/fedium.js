import express from 'express'
import {notFound} from '../../error/not-found.js'

const fedium = express.Router()

fedium.get('/users', (req, res) => {
  const users = res.locals.DB.users || []

  if (users.length === 0) {
    notFound(req, res)
    return
  }

  res.json(users)
})
fedium.get('/users/:id', (req, res) => {
  const id = req.params.id
  const user =
    res.locals.DB.users.find((user) => user.id === id) || {}

  if (Object.keys(user).length === 0) {
    notFound(req, res)
    return
  }

  res.json(user)
})
fedium.get('/users/:id/articles', (req, res) => {
  const id = req.params.id
  const articles =
    res.locals.DB.articles.filter(
      (article) => article.author === id
    ) || []

  if (articles.length === 0) {
    notFound(req, res)
    return
  }

  res.json(articles)
})
fedium.get('/users/:userId/articles/:articleId', (req, res) => {
  const userId = req.params.userId
  const articleId = req.params.articleId
  const article =
    res.locals.DB.articles.find(
      (article) =>
        article.author === userId && article.id === articleId
    ) || {}

  if (Object.keys(article).length === 0) {
    notFound(req, res)
    return
  }

  const user =
    res.locals.DB.users.find((user) => user.id === article.author) ||
    {}
  const responses =
    article.responses.map((id) => {
      const response = res.locals.DB.responses.find(
        (response) => response.id === id
      )
      const user = res.locals.DB.users.find(
        (user) => user.id === response.author
      )
      return {...response, author: user}
    }) || []

  res.json({
    ...article,
    author: user,
    responses: responses
  })
})

fedium.get('/articles', (req, res) => {
  const articles =
    res.locals.DB.articles.map((article) => {
      const user = res.locals.DB.users.find(
        (user) => user.id === article.author
      )
      return {...article, author: user}
    }) || []

  if (articles.length === 0) {
    notFound(req, res)
    return
  }

  res.json(articles)
})

export {fedium}
