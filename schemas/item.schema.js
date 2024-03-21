const itemSchema = `
  type Item {
    id: ID!
    name: String!
    price: Float!
    image: String!
    selectedVariant: String
    variants: [String]
    variantImages: [String]
  }
`;

module.exports = itemSchema;
