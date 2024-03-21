const cartItemSchema = `
  type CartItem {
    id: ID!
    item: Item!
    quantity: Int!
    selectedVariant: String
  }
`;

module.exports = cartItemSchema;
