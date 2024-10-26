import { Outlet } from 'react-router-dom';
import GuardHeader from '@/components/shared/guard-header.tsx';

export function GuardLayout() {
  return (
    <div className="flex flex-col">
      <GuardHeader />
      <Outlet />
    </div>
  );
}
