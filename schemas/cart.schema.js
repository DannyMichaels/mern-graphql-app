const cartSchema = `
  type Cart {
      items: [CartItem]!
      totalPrice: Float!
    }
`;

module.exports = cartSchema;
