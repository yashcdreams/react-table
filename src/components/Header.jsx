import { Link } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';

const Header = () => {
  return (
    <header>
      <nav className="flex justify-between items-center p-4">
        <ul className='flex space-x-4'>
          <li>
            <Link to={PathConstants.Home}>Home</Link>
          </li>
          <li>
            <Link to={PathConstants.About}>About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
