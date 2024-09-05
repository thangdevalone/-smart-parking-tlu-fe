// AuthProtect.tsx
import useAuthStore from '@/store/auth-store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axiosClient from '@/api/axiosClient.ts';

export default function AuthProtect() {
  const { isAuthenticated, tokens, user } = useAuthStore();
  const location = useLocation();
  const currentPath = location.pathname;
  if (tokens?.access_token) {
    axiosClient.defaults.headers['Authorization'] = `Bearer ${tokens?.access_token}`;
  }
  if (isAuthenticated && currentPath.startsWith('/auth')) {
    return <Navigate to={`/${user?.role.name}`} replace />;
  }

  if (!isAuthenticated && !currentPath.startsWith('/auth')) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}
