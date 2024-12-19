import { create } from 'zustand';

interface ActionGroupState {
  withAi: boolean;
  toggleWithAi: () => void;
}

export const useActionGroupStore = create<ActionGroupState>((set) => ({
  withAi: false,
  toggleWithAi: () => set((state) => ({ withAi: !state.withAi })),
}));
