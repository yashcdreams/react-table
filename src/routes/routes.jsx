import { lazy } from 'react';
import PathConstants from './pathConstants';
import ProtectedRoutes from '../components/authentication/ProtectedRoutes';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Login = lazy(() => import('../pages/Login'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

const routes = [
  { path: PathConstants.Home, element: <Home /> },
  { path: PathConstants.About, element: <About /> },
  { path: PathConstants.Login, element: <Login /> },
  {
    element: <ProtectedRoutes />,
    children: [{ path: PathConstants.Dashboard, element: <Dashboard /> }]
  }
];

export default routes;
