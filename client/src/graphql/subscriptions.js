import { gql } from '@apollo/client';

export const CART_UPDATED = gql`
  subscription {
    cartUpdated {
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
        }
      }
    }
  }
`;
