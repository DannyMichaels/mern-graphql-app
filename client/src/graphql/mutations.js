import { gql } from '@apollo/client';

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart(
    $id: ID!
    $quantity: Int = 1
    $selectedVariant: String
  ) {
    addItemToCart(
      id: $id
      quantity: $quantity
      selectedVariant: $selectedVariant
    ) {
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
          image
          variants
          variantImages
        }
      }
      totalPrice
    }
  }
`;

export const MODIFY_ITEM_IN_CART = gql`
  mutation ModifyItemInCart(
    $id: ID!
    $quantity: Int = 1
    $selectedVariant: String
  ) {
    modifyItemInCart(
      id: $id
      quantity: $quantity
      selectedVariant: $selectedVariant
    ) {
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
      totalPrice
    }
  }
`;
