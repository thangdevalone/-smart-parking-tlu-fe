import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/api/authApi';
import { toast } from 'sonner';
import { isErrorResponse } from '@/lib/utils';
import { LoginForm, LoginResponse, SuccessResponse, Tokens, User } from '@/types';
import { NavigateFunction } from 'react-router-dom';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  tokens: Tokens | null;
  login: (data: LoginForm, navigate: NavigateFunction) => Promise<void>;
  signOut: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      tokens: null,
      login: async (data: LoginForm, navigate: NavigateFunction) => {
        set({ loading: true });
        try {
          const response = await authApi.login(data) as unknown as SuccessResponse<LoginResponse>;
          set({
            user: response.data.user,
            isAuthenticated: true,
            loading: false,
            tokens: response.data.tokens,
          });
          navigate(`/${response.data.user.role.name}`);
        } catch (error) {
          set({ loading: false });
          if (isErrorResponse(error)) {
            toast.error(error.message);
          } else {
            toast.error('Có lỗi xảy ra, vui lòng thử lại!');
          }
        }
      },
      signOut: () => {
        set({
          user: null,
          isAuthenticated: false,
          tokens: null,
        });
        toast.success('Bạn đã đăng xuất thành công!');
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
