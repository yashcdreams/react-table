import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes/routes';
import PageNotFound from './pages/PageNotFound';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: routes
  }
]);

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
