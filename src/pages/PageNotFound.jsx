import { Link } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';

const PageNotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to={PathConstants.Home}>Go to Home</Link>
    </div>
  );
};

export default PageNotFound;
