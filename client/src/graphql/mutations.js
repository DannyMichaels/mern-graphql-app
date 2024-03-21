import { gql } from '@apollo/client';

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($id: ID!) {
    addItemToCart(id: $id) {
      items {
        id
        name
        price
      }
      totalPrice
    }
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($id: ID!) {
    removeItemFromCart(id: $id) {
      items {
        id
        quantity
        selectedVariant
        item {
          id
          name
          price
        }
      }
      totalPrice
    }
  }
`;

export const MODIFY_ITEM_IN_CART_QUANTITY = gql`
  mutation ModifyItemInCartQuantity($id: ID!, $quantity: Int!) {
    modifyItemInCartQuantity(id: $id, quantity: $quantity) {
      items {
        id
        name
        price
      }
      totalPrice
    }
  }
`;
