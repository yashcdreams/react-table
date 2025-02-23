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
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log in</button>
      <p>
        Or go back to <Link to={PathConstants.Home}>Home</Link>
      </p>
    </div>
  );
};

export default Login;
