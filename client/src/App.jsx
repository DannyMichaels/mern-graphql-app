import './App.css';
import { GET_ITEMS } from './graphql/queries';
import { useQuery } from '@apollo/client';
import { useCartContext } from './context/CartContext';
import AppRouter from './routes/index.routes';

function App() {
  const { data, loading, error } = useQuery(GET_ITEMS);
  const { cart, dispatch } = useCartContext();

  console.log({ data, loading, error, cart, dispatch });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
