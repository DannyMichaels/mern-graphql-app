const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const { itemSchema, cartSchema, cartItemSchema } = require('./schemas');

const app = express();

// Enable CORS
app.use(cors());

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  ${itemSchema}

  ${cartSchema}

  ${cartItemSchema}

  type Subscription {
    cartUpdated: Cart
  }

  type Query {
    items: [Item]!
    cart: Cart
    cartItems: [CartItem]!
  }

  type Mutation {
    addItemToCart(id: ID!, quantity: Int, selectedVariant: String): Cart
    removeItemFromCart(id: ID!): Cart
    modifyItemInCart(id: ID!, quantity: Int, selectedVariant: String): Cart
    createItem(name: String!, price: Float!, image: String!, variants: [String], variantImages: [String]): Item
  }
`);

// Sample data
let items = [
  {
    id: '1',
    name: 'Lays Chips',
    price: 10.0,
    image: 'https://i.imgur.com/5prrDdr.jpeg',
  },
  {
    id: '2',
    name: 'Oreos',
    price: 15.0,
    image: 'https://i.imgur.com/mK9bpFE.jpeg',
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    price: 20.0,
    image: 'https://i.imgur.com/XH93QTm.jpeg',
  },
  {
    id: '4',
    name: 'Shirt',
    variants: ['Red', 'Blue'],
    variantImages: [
      'https://i.imgur.com/eVVBVcr.jpeg',
      'https://i.imgur.com/pmNiKAx.jpeg',
    ],
    price: 30.0,
    image: 'https://i.imgur.com/eVVBVcr.jpeg',
  },
];

// let cart = {
//   items: [
//     { item: { ...items[0] }, quantity: 1, id: '1' },
//     { item: { ...items[1] }, quantity: 2, id: '2' },
//   ],
//   totalPrice: items[0].price + items[1].price * 2,
// };
const generateId = () => Math.random().toString(36).substr(2, 9);

let cart = {
  items: [],
  totalPrice: 0,
};

const calcTotalCartPrice = () => {
  let total = 0;
  cart.items.forEach((item) => {
    total += item.item.price * item.quantity;
  });
  return total;
};

const updateCartTotalPrice = () => (cart.totalPrice = calcTotalCartPrice());

const resolvers = {
  items: () => items,
  cart: () => cart,
  cartItems: () => cart.items,
  cartUpdated: () => cart,
  addItemToCart: ({ id, quantity = 1, selectedVariant = null }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      cart.items.push({
        id: String(generateId()),
        item,
        quantity,
        selectedVariant,
      });
      // cart.totalPrice += item.price * quantity;
      updateCartTotalPrice();
    }
    return cart;
  },
  removeItemFromCart: ({ id }) => {
    const index = cart.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const removedItem = cart.items.splice(index, 1)[0];
      // cart.totalPrice -= removedItem.item.price * removedItem.quantity;
      updateCartTotalPrice();
    }

    return cart;
  },
  modifyItemInCart: ({ id, quantity = 1, selectedVariant = null }) => {
    const index = cart.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const item = cart.items[index];
      // cart.totalPrice -= item.item.price * item.quantity;
      item.quantity = quantity;
      item.selectedVariant = selectedVariant;
      // cart.totalPrice += item.item.price * item.quantity;
      updateCartTotalPrice();
    }

    return cart;
  },

  createItem: ({ name, price, image, variants = [], variantImages = [] }) => {
    if (!name || !price || !image)
      throw new Error('name, price, and image are required');

    console.log({ name, price, image, variants, variantImages });
    const item = {
      id: String(generateId()),
      name,
      price,
      image,
      variants,
      variantImages,
    };
    items.push(item);
    return item;
  },
};

// Create an Express route for GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL for easy testing
  })
);

module.exports = app;
