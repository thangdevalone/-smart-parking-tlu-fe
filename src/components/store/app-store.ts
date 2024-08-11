// themeStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  collapseSidebar: boolean;
  toggleSidebar: () => void;
}

const useAppStore = create<AppState>()(
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
    }
  )
);

export default useAppStore;
