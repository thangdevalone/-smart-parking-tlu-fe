import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { DataCombobox } from '@/components/common/form-controls/combobox-field.tsx';

interface AppState {
  collapseSidebar: boolean;
  toggleSidebar: () => void;
  rolesInApp: DataCombobox[];
  setRolesInApp: (roles: DataCombobox[]) => void;
}

const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        collapseSidebar: false,
        toggleSidebar: () =>
          set((state) => ({
            collapseSidebar: !state.collapseSidebar,
          })),
        rolesInApp: [],
        setRolesInApp: (roles: DataCombobox[]) => set((state) => ({ ...state, rolesInApp: roles })),
      }),
      {
        name: 'app-storage',
        migrate: (persistedState) => {
          return persistedState;
        },
      },
    ),
    {
      name: 'AppStore',
      enabled: import.meta.env.VITE_ENVIRONMENT === 'development',
    },
  ),
);

export default useAppStore;
