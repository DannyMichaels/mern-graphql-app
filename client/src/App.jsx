import './App.css';
import AppRouter from './routes/index.routes';
import useInitializeStores from './hooks/useInitializeStores';

function App() {
  const { itemsLoading, cartsLoading } = useInitializeStores();

  if (itemsLoading || cartsLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
