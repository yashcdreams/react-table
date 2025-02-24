import { Link, useNavigate } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate(PathConstants.Login, { replace: true });
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h1>Dashboard (Protected)</h1>
      <p>This page is protected and requires authentication.</p>
      <button className="border border-gray text-primary font-semibold p-2 rounded-xl" onClick={handleLogout}>
        Log out
      </button>
      <p>
        <Link to={PathConstants.Home}>Back to Home</Link>
      </p>
    </div>
  );
};

export default Dashboard;
