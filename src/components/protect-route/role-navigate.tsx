import { Navigate, useLocation, useParams, Outlet } from 'react-router-dom';
import { RoleInApp } from '@/types';
import { AdminPanelLayout, GuardLayout } from '@/components/layouts';
import { useAllRoleFetcher } from '@/hooks';
import useAppStore from '@/store/app-store.ts';
import { useEffect } from 'react';

export default function RoleNavigate() {
  const { role } = useParams();
  const { pathname } = useLocation();
  const viewSetting = pathname.split('/')[2] === 'settings';
  const setRolesInApp = useAppStore(state => state.setRolesInApp);
  const { data, isFetched } = useAllRoleFetcher({
    options: { refetchOnWindowFocus: false },
  });

  useEffect(() => {
    if (data) {
      setRolesInApp(data.data);
    }
  }, [data, setRolesInApp]);

  if (isFetched) {
    switch (role) {
      case RoleInApp.GUARD:
        return <GuardLayout />;
      case RoleInApp.USER:
      case RoleInApp.ADMIN:
        return viewSetting ? <Outlet /> : <AdminPanelLayout />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return null;
}
