import { useCartContext } from '../context/CartContext';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM_FROM_CART } from '../graphql/mutations';

export default function Cart() {
  const { cart, dispatch } = useCartContext();

  const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART, {
    onCompleted: (data) => {
      const newCartState = data.removeItemFromCart;

      dispatch({
        type: 'UPDATE_CART',
        payload: newCartState,
      });
    },
  });

  const itemImage = (item, selectedVariant) => {
    console.log('itemImage', item, selectedVariant);
    if (item?.variantImages) {
      return item.variantImages[item.variants.indexOf(selectedVariant)];
    }
    return item.image;
  };

  return (
    <div>
      <h1>Cart</h1>
      <h2> total: ${cart.totalPrice}</h2>
      <ul>
        {cart.items.map((cartItem) => (
          <li key={cartItem.id}>
            cart item id: {cartItem.id} | &nbsp; item id {cartItem.item.id} |
            &nbsp;
            <b>{cartItem.item.name}</b> | &nbsp; Price: ${cartItem.item.price}
            &nbsp; Quantity: {cartItem.quantity}&nbsp;
            {cartItem.selectedVariant && (
              <span>Variant: {cartItem.selectedVariant}</span>
            )}
            <img
              // src={cartItem.item.image}
              src={itemImage(cartItem.item, cartItem.selectedVariant)}
              alt={cartItem.item.name}
              width="50"
            />
            <button
              onClick={() =>
                removeItemFromCart({
                  variables: { id: cartItem.id },
                })
              }>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
