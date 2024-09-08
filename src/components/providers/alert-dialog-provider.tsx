import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';

interface AlertDialogContextType {
  showAlert: (options: {
    header: string;
    description: string;
    confirmText?: string;
    asyncAction?: () => Promise<void>;
  }) => Promise<boolean>;
}

const AlertDialogContext = createContext<AlertDialogContextType | undefined>(undefined);

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [confirmText, setConfirmText] = useState('Confirm');
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);
  const [loading, setLoading] = useState(false);
  const [asyncAction, setAsyncAction] = useState<(() => Promise<void>) | null>(null);

  const showAlert = ({ header, description, confirmText = 'Confirm', asyncAction }: {
    header: string;
    description: string;
    confirmText?: string;
    asyncAction?: () => Promise<void>;
  }): Promise<boolean> => {
    return new Promise((resolve) => {
      setHeader(header);
      setDescription(description);
      setConfirmText(confirmText);
      setAsyncAction(() => asyncAction || null);
      setResolvePromise(() => resolve);
      setIsOpen(true);
    });
  };

  const handleConfirm = async () => {
    setLoading(true);
    if (asyncAction) {
      try {
        await asyncAction(); // Execute the async action
        setLoading(false);
        setIsOpen(false);
        if (resolvePromise) resolvePromise(true);
      } catch (error) {
        setLoading(false);
        console.error('Error executing async action:', error);
      }
    } else {
      setIsOpen(false);
      if (resolvePromise) resolvePromise(true);
    }
    setResolvePromise(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (resolvePromise) resolvePromise(false);
    setResolvePromise(null);
  };

  return (
    <AlertDialogContext.Provider value={{ showAlert }}>
      <>
        {children}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{header}</AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel} disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm} asChild>
                <Button loading={loading}>{confirmText}</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </AlertDialogContext.Provider>
  );
};

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (context === undefined) {
    throw new Error('useAlertDialog must be used within an AlertDialogProvider');
  }
  return context;
};
