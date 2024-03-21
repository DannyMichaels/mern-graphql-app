import './App.css';
import { useEffect } from 'react';
import AppRouter from './routes/index.routes';
import { useCartStore } from './stores/cart.store';
import { GET_CART, GET_ITEMS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { useItemsStore } from './stores/items.store';

function App() {
  const { initState: initCartsState } = useCartStore();
  const { dispatch } = useItemsStore();

  const { data: itemsData, loading: itemsLoading } = useQuery(GET_ITEMS);
  const { data: cartsData, loading: cartsLoading, error } = useQuery(GET_CART);

  useEffect(() => {
    if (cartsData && !cartsLoading) {
      initCartsState(cartsData.cart);
    }

    if (itemsData && !itemsLoading) {
      dispatch({ items: itemsData.items });
    }
  }, [cartsLoading, itemsData, itemsLoading, cartsData]);

  if (itemsLoading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
