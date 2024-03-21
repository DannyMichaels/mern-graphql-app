import { createContext, useContext, useReducer } from 'react';
import { CART_UPDATED } from '../graphql/subscriptions';
import { useSubscription } from '@apollo/client';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CART':
      return {
        ...state,
        items: action.payload,
      };
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });

  useSubscription(CART_UPDATED, {
    onSubscriptionData: ({ subscriptionData }) => {
      dispatch({
        type: 'UPDATE_CART',
        payload: subscriptionData.data.cartUpdated,
      });
    },
  });

  return (
    <CartContext.Provider value={{ cart: state.items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => useContext(CartContext);

export { CartContext, CartProvider, useCartContext };
