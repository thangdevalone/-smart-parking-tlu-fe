import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { RoleInApp } from '@/types';
import { AdminPanelLayout, GuardLayout } from '@/components/layouts';
import { useAllRoleFetcher } from '@/hooks';
import useComboboxStateStore from '@/store/combobox-state-store.ts';
import { AnimatedLoader } from '@/components/shared/animation-loader.tsx';

export default function RoleNavigate() {
  const { role } = useParams();
  const { setRolesInApp, rolesInApp } = useComboboxStateStore(state => state);
  const { data } = useAllRoleFetcher({
    options: { refetchOnWindowFocus: false, enabled: role === RoleInApp.ADMIN },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && setRolesInApp) {
      setRolesInApp(data.data);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [data, setRolesInApp]);

  if (loading) {
    return (
      <AnimatedLoader />
    );
  }

  if (rolesInApp?.length > 0) {
    if (role === RoleInApp.GUARD) {
      return <GuardLayout />;
    }
    if ([RoleInApp.USER, RoleInApp.ADMIN].includes(role as RoleInApp)) {
      return <AdminPanelLayout />;
    }

    return <Navigate to={'/not-found'} replace={true} />;
  }

  return <Navigate to={'/not-found'} replace={true} />;
}
