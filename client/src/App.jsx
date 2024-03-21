import './App.css';
import { useEffect } from 'react';
import AppRouter from './routes/index.routes';
import { useCartStore } from './stores/cart.store';
import { GET_CART } from './graphql/queries';
import { useQuery } from '@apollo/client';

function App() {
  const { initState } = useCartStore();

  const { data, loading, error } = useQuery(GET_CART);

  useEffect(() => {
    if (data && !loading) {
      initState(data.cart);
    }
  }, [loading, data]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
