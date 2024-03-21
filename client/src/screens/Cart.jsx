/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  MODIFY_ITEM_IN_CART,
  REMOVE_ITEM_FROM_CART,
} from '../graphql/mutations';
import { useCartStore } from '../stores/cart.store';

export default function Cart() {
  const { dispatch, ...cart } = useCartStore();

  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART, {
    onCompleted: (data) => {
      const newCartState = data.removeItemFromCart;
      dispatch(newCartState);
    },
  });

  const [modifyItemInCart] = useMutation(MODIFY_ITEM_IN_CART, {
    onCompleted: (data) => {
      const newCartState = data.modifyItemInCart;
      dispatch(newCartState);
    },
  });

  return (
    <div>
      <h1>Cart</h1>
      <h2> total: ${cart.totalPrice}</h2>
      <ul>
        {cart.items.map((cartItem) => (
          <CartItem
            cartItem={cartItem}
            removeItemFromCart={removeItemFromCart}
            modifyItemInCart={modifyItemInCart}
            itemImage={(item, selectedVariant) => {
              if (item?.variantImages?.length) {
                return item.variantImages[
                  item.variants.indexOf(selectedVariant)
                ];
              }
              return item.image;
            }}
            key={cartItem.id}
          />
        ))}
      </ul>
    </div>
  );
}

const CartItem = ({
  cartItem,
  removeItemFromCart,
  modifyItemInCart,
  itemImage,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState(
    cartItem.selectedVariant
  );

  const [quantity, setQuantity] = useState(cartItem.quantity);

  return (
    <li key={cartItem.id}>
      cart item id: {cartItem.id} | &nbsp; item id {cartItem.item.id} | &nbsp;
      <b>{cartItem.item.name}</b> | &nbsp; Price: ${cartItem.item.price}
      &nbsp; Quantity:
      {!isEditMode ? (
        <span>{cartItem.quantity}</span>
      ) : (
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      )}
      &nbsp; | Total Price: ${cartItem.item.price * cartItem.quantity} |&nbsp;
      {cartItem.selectedVariant && (
        <>
          {!isEditMode ? (
            <span>Variant: {cartItem.selectedVariant}</span>
          ) : (
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}>
              {cartItem.item.variants.map((variant) => (
                <option key={variant} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          )}
        </>
      )}
      <img
        // src={cartItem.item.image}
        src={itemImage(cartItem.item, cartItem.selectedVariant)}
        alt={cartItem.item.name}
        width="50"
      />
      {!isEditMode && (
        <button
          onClick={() =>
            removeItemFromCart({
              variables: { id: cartItem.id },
            })
          }>
          Remove
        </button>
      )}
      &nbsp;
      <button
        onClick={() => {
          setIsEditMode(!isEditMode);
          setQuantity(cartItem.quantity);
          setSelectedVariant(cartItem.selectedVariant);
        }}>
        {isEditMode ? 'Cancel' : 'Edit'}
      </button>
      &nbsp;
      {isEditMode && (
        <button
          onClick={() => {
            modifyItemInCart({
              variables: {
                id: cartItem.id,
                quantity: parseInt(quantity, 10),
                selectedVariant,
              },
            });
            setIsEditMode(false);
          }}>
          Save
        </button>
      )}
    </li>
  );
};
