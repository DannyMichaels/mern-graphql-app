import { Navigate, useRoutes } from 'react-router-dom';
import Home from '../screens/Home';
import NotFound from '../screens/NotFound';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';

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
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
  ]);

  return routes;
}
