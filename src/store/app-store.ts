import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  collapseSidebar: boolean;
  toggleSidebar: () => void;
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
