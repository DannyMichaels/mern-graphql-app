import { useQuery } from '@apollo/client';
import { useCartStore } from '../stores/cart.store';
import { useItemsStore } from '../stores/items.store';
import { GET_CART, GET_ITEMS } from '../graphql/queries';
import { useEffect } from 'react';

export default function useInitializeStores() {
  const { initState: initCartsState } = useCartStore();
  const { dispatch } = useItemsStore();

  const { data: itemsData, loading: itemsLoading } = useQuery(GET_ITEMS);
  const { data: cartsData, loading: cartsLoading } = useQuery(GET_CART);

  useEffect(() => {
    if (cartsData && !cartsLoading) {
      initCartsState(cartsData.cart);
    }

    if (itemsData && !itemsLoading) {
      dispatch({ items: itemsData.items });
    }
  }, [cartsLoading, itemsData, itemsLoading, cartsData]);

  return { itemsLoading, cartsLoading };
}
