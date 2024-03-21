import { gql } from '@apollo/client';

// export const GET_CART = gql`
//   query {
//     cart {
//       items {
//         id
//         name
//         price
//       }
//       totalPrice
//     }
//   }
// `;

export const GET_CART = gql`
  query {
    cart {
      totalPrice
      items {
        id
        quantity
        selectedVariant

        item {
          id
          name
          price
          image
          variants
          variantImages
        }
      }
    }
  }
`;

export const GET_ITEMS = gql`
  query {
    items {
      id
      name
      price
      image
      variants
      variantImages
    }
  }
`;
