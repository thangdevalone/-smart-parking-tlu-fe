import useAuthStore from '@/store/auth-store';
import { Navigate, Outlet } from 'react-router-dom';
import { RoleInApp } from '@/types';


export default function AdminProtect() {
  const { user } = useAuthStore();

  if (user?.role && (user.role.name !== RoleInApp.ADMIN)) return <Navigate to="/not-found" replace />;

  return <Outlet />;
}
