import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash2 } from 'lucide-react';
import { DialogActionType, Role } from '@/types';
import { KeyDialogs } from '@/constants';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu';
import { roleApi } from '@/api/roleApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAlertDialog } from '@/components/providers/alert-dialog-provider';

interface UserRowActionsProps {
  row: Row<Role>;
}

export function RoleActions(props: UserRowActionsProps) {
  const {
    row,
  } = props;
  const { setDialogState } = useDialogStore();
  const { showAlert } = useAlertDialog();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (variables: { id: number }) =>  roleApi.deleteRole([variables.id]),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['role'] }).then(() => {
        console.log(data)
        toast.success(data.data.message || 'Xóa vai trò thành công!');
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Something went wrong');
    },
  });

  const handleDeleteRole = async () => {
    await showAlert({
      header: 'Xác nhận xóa hàng',
      description: 'Bạn có chắc chắn muốn tiếp tục không?',
      confirmText: 'Xóa',
      asyncAction: async () => {
        mutation.mutate({ id: row.original.id });
      },
    });
  }
  
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
          <DropdownMenuItem onClick={() => handleDeleteRole()}
            className="cursor-pointer"><Trash2 className="h-4 mr-2 w-4" />Xoá vai trò</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogState(KeyDialogs.role, {
            open: true,
            actionType: DialogActionType.EDIT,
            data: row.original,
          })}><Pencil
              className="h-4 mr-2 w-4" />Chỉnh sửa</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
