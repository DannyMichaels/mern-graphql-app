import { createContext, useContext, useReducer } from 'react';
import { CART_UPDATED } from '../graphql/subscriptions';
import { useQuery, useSubscription } from '@apollo/client';
import { GET_CART } from '../graphql/queries';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CART':
      return {
        ...state,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
        loading: false,
      };
  }
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    loading: true,
  });

  // useSubscription(CART_UPDATED, {
  //   onSubscriptionData: ({ subscriptionData }) => {
  //     console.log('cart updated', subscriptionData.data.cartUpdated);
  //     dispatch({
  //       type: 'UPDATE_CART',
  //       payload: subscriptionData.data.cartUpdated,
  //     });
  //   },
  // });

  useQuery(GET_CART, {
    onCompleted: (data) => {
      dispatch({
        type: 'UPDATE_CART',
        payload: data.cart,
      });
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        isCartLoading: state.loading,
        dispatch,
      }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => useContext(CartContext);

export { CartContext, CartProvider, useCartContext };
