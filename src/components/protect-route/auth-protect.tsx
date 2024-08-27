// AuthProtect.tsx
import useAuthStore from '@/store/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthProtect() {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;

  if (isAuthenticated && currentPath.startsWith('/auth')) {
    return <Navigate to={`/${user?.role.name}`} replace />;
  }

  if (!isAuthenticated && !currentPath.startsWith('/auth')) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
