import { Link } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';

const Home = () => {
  return (
    <div className="flex flex-col items-center text-primary">
      <h1 className="text-3xl">Public Home Page</h1>
      <p className="mt-4 text-secondary">This page is accessible by everyone.</p>
      <Link className="mt-4 font-semibold" to={PathConstants.Login}>
        Go to Login
      </Link>
      <Link className="mt-4 font-semibold" to={PathConstants.Dashboard}>
        Dashboard (Protected)
      </Link>
    </div>
  );
};

export default Home;
