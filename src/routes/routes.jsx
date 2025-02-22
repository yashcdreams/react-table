import { lazy } from 'react';
import PathConstants from './pathConstants';

const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));

const routes = [
  { path: PathConstants.Home, element: <Home /> },
  { path: PathConstants.About, element: <About /> }
];

export default routes;
