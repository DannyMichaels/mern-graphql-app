const cartSchema = `
  type Cart {
      items: [Item]!
      totalPrice: Float!
    }
`;

module.exports = cartSchema;
