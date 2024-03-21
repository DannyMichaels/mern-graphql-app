import { gql } from '@apollo/client';

export const CART_UPDATED = gql`
  subscription {
    cartUpdated {
      items {
        id
        name
        price
      }
      totalPrice
    }
  }
`;
