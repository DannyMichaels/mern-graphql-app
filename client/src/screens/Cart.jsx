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

  return (
    <div>
      <h1>Cart</h1>
      <h2> total: ${cart.totalPrice}</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              onClick={() =>
                removeItemFromCart({
                  variables: { id: item.id },
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
