import { Navigate, useRoutes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

// screens
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import ItemCreate from '../screens/ItemCreate';
import NotFound from '../screens/NotFound';

export default function AppRouter() {
  const routes = useRoutes([
    {
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),

      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'cart',
          element: <Cart />,
        },
        {
          path: 'create-item',
          element: <ItemCreate />,
        },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);

  return routes;
}
