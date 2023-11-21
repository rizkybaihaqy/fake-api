import {parseSeed} from '#utils/parser.js'
import {faker} from '@faker-js/faker'

/**
 * @typedef Shop
 * @property {string} id
 * @property {string} name
 * @property {string} logo
 * @property {Date} createdAt
 */

/**
 * @param {Shop} shop
 */
const createShop = (shop) => shop

const emptyShop = createShop({
  id: '',
  name: '',
  logo: '',
  createdAt: new Date()
})

export const Shop = {
  name: 'shop',

  create: createShop,

  generate: ({id, name}) => {
    faker.seed(parseSeed(id))

    const definitions = {
      lastName: faker.definitions.person.last_name,
      adjective: faker.definitions.commerce.product_name.adjective,
      product: faker.definitions.commerce.product_name.product
    }

    const shopName = {
      lastName: faker.person.lastName,
      adjective: faker.commerce.productAdjective,
      product: faker.commerce.product
    }

    const matchingDefinition = Object.keys(definitions).find((key) =>
      definitions[key].includes(name)
    )

    if (name && !matchingDefinition) {
      return emptyShop
    }

    if (name && matchingDefinition) {
      shopName[matchingDefinition] = () => name
    }

    return createShop({
      id,
      name: [
        shopName.lastName(),
        shopName.adjective(),
        shopName.product()
      ]
        .sort(() => Math.random() - 0.5)
        .join(' '),
      logo: faker.image.urlLoremFlickr({category: 'shop,logo'}),
      createdAt: faker.date.past()
    })
  }
}

/**
 * @typedef Product
 * @property {string} id
 * @property {string} name
 * @property {string[]} images
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string} shopId
 * @property {Date} createdAt
 */

/**
 * @param {Product} product
 */
const createProduct = (product) => product

/**
 * @param {Product} product
 */
const emptyProduct = createProduct({
  id: '',
  name: '',
  images: [],
  description: '',
  price: 0,
  stock: 0,
  shopId: '',
  createdAt: new Date()
})

export const Product = {
  name: 'product',

  create: createProduct,

  generate: ({id, name}) => {
    faker.seed(parseSeed(id))

    const definitions = {
      name: faker.definitions.commerce.product_name.product,
      material: faker.definitions.commerce.product_name.material,
      adjective: faker.definitions.commerce.product_name.adjective
    }

    const product = {
      name: faker.commerce.product,
      material: faker.commerce.productMaterial,
      adjective: faker.commerce.productAdjective
    }

    const matchingDefinition = Object.keys(definitions).find((key) =>
      definitions[key].includes(name)
    )

    if (name && !matchingDefinition) {
      return emptyProduct
    }

    if (name && matchingDefinition) {
      product[matchingDefinition] = () => name
    }

    return createProduct({
      id,
      name: `${product.adjective()} ${product.material()} ${product.name()}`,
      images: Array.from({length: faker.number.int(5)}, () =>
        faker.image.urlLoremFlickr({
          category: product.name()
        })
      ),
      description: faker.commerce.productDescription(),
      price: faker.number.int(1000),
      stock: faker.number.int(100),
      shopId: faker.string.nanoid(),
      createdAt: faker.date.past()
    })
  }
}

/**
 * @typedef Order
 * @property {string} id
 * @property {string} productId
 * @property {number} quantity
 * @property {number} price
 * @property {string} userId
 * @property {Date} createdAt
 */

/**
 * @param {Order} order
 */
const createOrder = (order) => order

export const Order = {
  name: 'order',

  create: createOrder,

  generate: ({id}) => {
    faker.seed(parseSeed(id))

    return createOrder({
      id,
      productId: faker.string.nanoid(),
      quantity: faker.number.int({min: 1, max: 3}),
      price: faker.number.int(1000),
      userId: faker.string.nanoid(),
      createdAt: faker.date.past()
    })
  }
}
