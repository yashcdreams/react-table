import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PathConstants from '../../routes/pathConstants';
import { useAuth } from '../../hooks/useAuth';

// Protected Route component
const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PathConstants.Login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
