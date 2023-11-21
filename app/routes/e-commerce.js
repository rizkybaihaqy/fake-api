import {Order, Product, Shop} from '#model/e-commerce.js'
import {User} from '#model/user.js'
import {NumberFromString} from '#utils/codec.js'
import {DB} from '#utils/db.js'
import express from 'express'
import {
  Codec,
  Either,
  Right,
  identity,
  optional,
  string
} from 'purify-ts'

const eCommerce = express.Router()

eCommerce.get('/shops', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    name: optional(string)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, Shop).fetch)
    .map(({data, ...rest}) => ({
      shops: data.map(identity),
      ...rest
    }))
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((shops) => res.json(shops))
    .ifLeft((error) => res.status(400).json(error))
})

eCommerce.get('/shops/:id', (req, res) => {
  Right(req.params.id)
    .chain(DB(res.locals.seed, Shop).get)
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((users) => res.json(users))
    .ifLeft((error) => res.status(400).json(error))
})

eCommerce.get('/shops/:id/products', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    name: optional(string)
  })
    .decode(req.query)
    .map((query) => ({...query, shopId: req.params.id}))
    .chain(DB(res.locals.seed, Product).fetch)
    .chain(({data, ...rest}) =>
      DB(res.locals.seed, Shop)
        .get(req.params.id)
        .map((shop) => ({shop, products: data, ...rest}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((notes) => res.json(notes))
    .ifLeft((error) => res.status(400).json(error))
})

eCommerce.get('/shops/:shopId/products/:id', (req, res) => {
  Right({shopId: req.params.shopId, productId: req.params.id})
    .chain(({productId, shopId}) =>
      DB(res.locals.seed, Product)
        .get(productId)
        .map((product) => ({product, shopId}))
    )
    .chain(({product, shopId}) =>
      DB(res.locals.seed, Shop)
        .get(shopId)
        .map((shop) => ({product, shop}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((data) => res.json(data))
    .ifLeft((error) => res.status(400).json(error))
})

eCommerce.get('/products', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString),
    name: optional(string)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, Product).fetch)
    .map(({data, ...rest}) => ({
      products: data.map((product) =>
        DB(res.locals.seed, Shop)
          .get(product.shopId)
          .map((shop) => ({...product, shop}))
      ),
      ...rest
    }))
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((shops) => res.json(shops))
    .ifLeft((error) => res.status(400).json(error))
})

eCommerce.get('/orders', (req, res) => {
  Codec.interface({
    _limit: optional(NumberFromString),
    _page: optional(NumberFromString)
  })
    .decode(req.query)
    .chain(DB(res.locals.seed, Order).fetch)
    .chain(({data, ...rest}) =>
      Either.sequence(
        data.map((order) =>
          DB(res.locals.seed, Product)
            .get(order.productId)
            .map((product) => ({...order, product}))
            .map((order) => ({
              ...order,
              price: order.product.price * order.quantity
            }))
            .chain(({product, ...rest}) =>
              DB(res.locals.seed, Shop)
                .get(product.shopId)
                .map((shop) => ({
                  ...rest,
                  product: {...product, shop}
                }))
            )
            .chain((order) =>
              DB(res.locals.seed, User)
                .get(order.userId)
                .map((user) => ({...order, user}))
            )
        )
      ).map((orders) => ({orders, ...rest}))
    )
    .mapLeft((error) => ({
      message: error,
      status: 400
    }))
    .ifRight((orders) => res.json(orders))
    .ifLeft((error) => res.status(400).json(error))
})

export {eCommerce}
