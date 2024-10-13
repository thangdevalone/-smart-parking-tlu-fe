import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { authApi } from '@/api/authApi';
import { toast } from 'sonner';
import { isErrorResponse } from '@/lib/utils';
import { LoginForm, Tokens, User } from '@/types';
import { NavigateFunction } from 'react-router-dom';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  tokens: Tokens | null;
  login: (data: LoginForm, navigate: NavigateFunction) => Promise<void>;
  signOut: () => void;
  updateUser: (updatedUser: User) => void; // New updateUser function
};

const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        loading: false,
        tokens: null,
        login: async (loginData: LoginForm, navigate: NavigateFunction) => {
          set({ loading: true });
          try {
            const { data } = await authApi.login(loginData);
            set({
              user: data.data.user,
              isAuthenticated: true,
              loading: false,
              tokens: data.data.tokens,
            });
            navigate(`/${data.data.user.role.name}`);
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
        updateUser: (updatedUser: User) => {
          set((state) => ({
            user: { ...state.user, ...updatedUser }, // Merge existing user with updated data
          }));
          toast.success('Thông tin người dùng đã được cập nhật!');
        },
      }),
      {
        name: 'auth-storage',
      },
    ),
    {
      name: 'AuthStore',
      enabled: import.meta.env.VITE_ENVIRONMENT === 'development',
    },
  ),
);

export default useAuthStore;
