import { Navigate, useParams } from 'react-router-dom';
import { RoleInApp } from '@/types';
import { AdminPanelLayout, GuardLayout } from '@/components/layouts';
import { useAllRoleFetcher } from '@/hooks';
import useAppStore from '@/store/app-store.ts';

export default function RoleNavigate() {
  const { role } = useParams();
  const setRolesInApp = useAppStore(state => state.setRolesInApp);
  const { data } = useAllRoleFetcher({
      options: { refetchOnWindowFocus: false, enabled: role === RoleInApp.ADMIN },
    },
  );
  if (data && setRolesInApp) {
    setRolesInApp(data.data);
  }

  if (role == RoleInApp.GUARD) {
    return <GuardLayout />;
  }
  if ([RoleInApp.USER, RoleInApp.ADMIN].includes(role as RoleInApp)) {
    return <AdminPanelLayout />;
  }

  return <Navigate to={'/not-found'} replace={true} />;

}
