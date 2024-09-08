// dialog-state-store.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { IKeyDialog, KeyDialogs } from '@/constants';
import { DialogActionType } from '@/types';

interface DialogData<T = any> {
  open: boolean;
  action?: DialogActionType;
  data?: T;
}

interface DialogState<T = any> {
  dialogs: Record<IKeyDialog, DialogData<T>>;
  openDialog: (key: IKeyDialog, actionType?: DialogActionType, data?: T) => void;
  closeDialog: (key: IKeyDialog) => void;
  toggleDialog: (key: IKeyDialog) => void;
  setDialogState: (key: IKeyDialog, props: { open: boolean; actionType?: DialogActionType; data?: T }) => void;
}

export const useDialogStore = create<DialogState<any>>()(
  devtools(
    (set) => ({
      dialogs: Object.values(KeyDialogs).reduce((acc, key) => {
        acc[key] = { open: false }; // The key here is the value of KeyDialogs
        return acc;
      }, {} as Record<IKeyDialog, DialogData<any>>),

      openDialog: (key: IKeyDialog, actionType: DialogActionType = DialogActionType.CREATE, data: any = null) => set((state) => ({
        dialogs: {
          ...state.dialogs,
          [key]: { open: true, action: actionType, data },
        },
      })),

      closeDialog: (key: IKeyDialog) => set((state) => ({
        dialogs: {
          ...state.dialogs,
          [key]: { ...state.dialogs[key], open: false },
        },
      })),

      setDialogState: (key: IKeyDialog, { open, actionType = DialogActionType.CREATE, data }: {
        open: boolean;
        actionType?: DialogActionType;
        data?: any;
      }) => set((state) => ({
        dialogs: {
          ...state.dialogs,
          [key]: { open, action: actionType, data },
        },
      })),

      toggleDialog: (key: IKeyDialog) => set((state) => ({
        dialogs: {
          ...state.dialogs,
          [key]: {
            ...state.dialogs[key],
            open: !state.dialogs[key]?.open,
          },
        },
      })),
    }),
    {
      name: 'DialogStore',
      enabled: import.meta.env.MODE === 'development',
    },
  ),
);
