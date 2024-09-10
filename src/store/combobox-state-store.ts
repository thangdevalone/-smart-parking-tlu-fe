import { DataCombobox } from '@/components/common/form-controls/combobox-field.tsx';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ComboboxState {
  rolesInApp: DataCombobox[];
  setRolesInApp: (roles: DataCombobox[]) => void;
}

const useComboboxStateStore = create<ComboboxState>()(
  devtools(
    (set) => ({
      rolesInApp: [],
      setRolesInApp: (roles: DataCombobox[]) => set({ rolesInApp: roles }),
    }),
    {
      name: 'combobox-state-storage',
      enabled: import.meta.env.VITE_ENVIRONMENT === 'development',
    },
  ),
);

export default useComboboxStateStore;
