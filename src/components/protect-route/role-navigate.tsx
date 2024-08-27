import { useParams } from 'react-router-dom';
import { RoleInApp } from '@/types';
import { AdminPanelLayout, GuardLayout } from '@/components/layouts';

export default function RoleNavigate() {
  const { role } = useParams();
  console.log([RoleInApp.USER, RoleInApp.ADMIN].includes(role as RoleInApp));
  if (role == RoleInApp.GUARD) {
    return <GuardLayout />;
  }
  if ([RoleInApp.USER, RoleInApp.ADMIN].includes(role as RoleInApp)) {
    return <AdminPanelLayout />;
  }

}
