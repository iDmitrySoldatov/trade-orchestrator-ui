import { useAppSelector } from '../../services/hooks.ts';
import { Navigate, useLocation } from 'react-router-dom';

interface ComponentProps {
  element: React.ReactNode;
}

const ProtectedRouteComponent = ({ element }: ComponentProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  } else {
    return element;
  }
};

export default ProtectedRouteComponent;
