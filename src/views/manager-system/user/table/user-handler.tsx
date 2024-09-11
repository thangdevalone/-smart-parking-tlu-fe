import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Pencil } from 'lucide-react';
import { useAppPath } from '@/hooks';
import { DialogActionType, User } from '@/types';
import { KeyDialogs } from '@/constants';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';


interface UserRowActionsProps {
  row: Row<User>;
}

export function UserHandler(props: UserRowActionsProps) {
  const {
    row,
  } = props;
  const { navigateAppPath } = useAppPath();
  const { setDialogState } = useDialogStore();
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
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigateAppPath(['card-type', String(row.original.id)])}
                            className="cursor-pointer"><Eye className="h-4 mr-2 w-4" /> Xem</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogState(KeyDialogs.cardType, {
            open: true,
            actionType: DialogActionType.EDIT,
            data: row.original,
          })}><Pencil
            className="h-4 mr-2 w-4" />Chỉnh sửa</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Đổi trạng thái</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Active</DropdownMenuItem>
              <DropdownMenuItem>Inactive</DropdownMenuItem>

            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
