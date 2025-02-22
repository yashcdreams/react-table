import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import routes from './routes/routes';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>404 not found</div>,
    children: routes
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
