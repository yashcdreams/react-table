import { Link } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';

const Home = () => {
  return (
    <div>
      <h1>Public Home Page</h1>
      <p>This page is accessible by everyone.</p>
      <Link to={PathConstants.Login}>Go to Login</Link> | <Link to={PathConstants.Dashboard}>Dashboard (Protected)</Link>
    </div>
  );
};

export default Home;
