import { useNavigate, Link, useLocation } from 'react-router-dom';
import PathConstants from '../routes/pathConstants';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    // Redirect to the original requested page or dashboard
    const from = state?.from?.pathname || PathConstants.Dashboard;
    navigate(from, { replace: true });
  };

  return (
    <div className="text-center space-y-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-primary">Login Page</h1>
      <button className="border border-gray text-primary font-semibold p-2 rounded-xl" onClick={handleLogin}>
        Log in
      </button>
      <p className="border border-gray text-primary font-semibold p-2 rounded-xl w-fit">
        Back to <Link className='font-bold text-darkblue' to={PathConstants.Home}>Home</Link>
      </p>
    </div>
  );
};

export default Login;
