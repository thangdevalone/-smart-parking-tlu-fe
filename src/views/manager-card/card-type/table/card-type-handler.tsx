import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2 } from 'lucide-react';
import { useCardTypeDelete } from '@/hooks';
import { CardType, DialogActionType } from '@/types';
import { KeyDialogs } from '@/constants';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { useAlertDialog } from '@/components/providers/alert-dialog-provider.tsx';


interface CardTypeRowActionsProps {
  row: Row<CardType>;
}

export function CardTypeHandler(props: CardTypeRowActionsProps) {
  const {
    row,
  } = props;
  const { setDialogState } = useDialogStore();
  const { showAlert } = useAlertDialog();
  const mutation = useCardTypeDelete();
  const handleDelete = async () => {
    await showAlert({
      header: 'Xác nhận xóa hàng',
      description: 'Bạn có chắc chắn muốn tiếp tục không?',
      confirmText: 'Xóa',
      asyncAction: async () => {
        mutation.mutate([row.original.id]);
      },
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogState(KeyDialogs.cardType, {
          open: true,
          actionType: DialogActionType.EDIT,
          data: row.original,
        })}><Pencil
          className="h-4 mr-2 w-4" /> Chỉnh sửa</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDelete()} className="cursor-pointer">
          <Trash2 className="h-4 mr-2 w-4" /> Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
