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
    addItemToCart(id: ID!): Cart
    removeItemFromCart(id: ID!): Cart
    modifyItemInCartQuantity(id: ID!, quantity: Int!): Cart
    modifyItemInCartSelectedVariant(id: ID!, selectedVariant: String!): Cart
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

let cart = {
  items: [],
  totalPrice: 0,
};

const resolvers = {
  items: () => items,
  cart: () => cart,
  cartUpdated: () => cart,
  addItemToCart: ({ id }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      cart.items.push({
        item,
        quantity: 1,
      });
      cart.totalPrice += item.price;
    }
    return cart;
  },
  removeItemFromCart: ({ id }) => {
    const index = cart.items.findIndex((item) => item.id === id);

    if (index !== -1) {
      const removedItem = cart.items.splice(index, 1)[0];
      cart.totalPrice -= removedItem.item.price;
    }

    return cart;
  },
  modifyItemInCartQuantity: ({ id, quantity }) => {
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
  modifyItemInCartSelectedVariant: ({ id, selectedVariant }) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      const index = cart.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        cart.items[index].selectedVariant = selectedVariant;
        cart.items[index].item.image =
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
