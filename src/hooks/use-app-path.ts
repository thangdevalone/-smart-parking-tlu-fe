import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/auth-store.ts';

export const useAppPath = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const basePath = `/${user?.role.name}`;

  const navigateAppPath = (paths: string[] = []) => {
    const combinedPath = paths.length ? `/${paths.map(path => path.replace(/^\/+/, '')).join('/')}` : '';

    navigate(`${basePath}${combinedPath}`);
  };

  return { navigateAppPath, basePath };
};
