const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { itemSchema, cartSchema } = require('./schemas');

const app = express();

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  ${itemSchema}

  ${cartSchema}

  type Query {
    items: [Item]!
    cart: Cart
  }

  type Mutation {
    addItemToCart(id: ID!): Cart
    removeItemFromCart(id: ID!): Cart
    modifyItemQuantity(id: ID!, quantity: Int!): Cart
    modifyItemSelectedVariant(id: ID!, selectedVariant: String!): Cart
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
    selectedVariant: 'Red',
    variants: ['Red', 'Blue'],
    variantImages: [
      'https://i.imgur.com/eVVBVcr.jpeg',
      'https://i.imgur.com/pmNiKAx.jpeg',
    ],
    price: 30.0,
    image: 'https://i.imgur.com/eVVBVcr.jpeg',
  },
];

let cart = {
  items: [],
  totalPrice: 0,
};

const resolvers = {
  items: () => items,
  cart: () => cart,
  addItemToCart: ({ id }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      cart.items.push(item);
      cart.totalPrice += item.price;
    }
    return cart;
  },
  removeItemFromCart: ({ id }) => {
    const index = cart.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      const removedItem = cart.items.splice(index, 1)[0];
      cart.totalPrice -= removedItem.price;
    }
    return cart;
  },
  modifyItemQuantity: ({ id, quantity }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const index = cart.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart.totalPrice -= cart.items[index].price * cart.items[index].quantity;
        cart.items[index].quantity = quantity;
        cart.totalPrice += item.price * quantity;
      }
    }
    return cart;
  },
  modifyItemSelectedVariant: ({ id, selectedVariant }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const index = cart.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart.items[index].selectedVariant = selectedVariant;
        cart.items[index].image =
          item.variantImages[item.variants.indexOf(selectedVariant)];
      }
    }
    return cart;
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
