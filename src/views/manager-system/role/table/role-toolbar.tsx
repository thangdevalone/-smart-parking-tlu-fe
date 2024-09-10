import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input.tsx';
import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options.tsx';
import { Button, buttonVariants } from '@/components/ui/button.tsx';
import { Plus, SearchIcon, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDialogStore } from '@/store/dialog-state-store';
import { KeyDialogs } from '@/constants';
import RoleForm from '../form/role-form-page';
import { motion } from 'framer-motion';
import { useAlertDialog } from '@/components/providers/alert-dialog-provider';
import { useRoleDelete } from '@/hooks/mutation/use-role-delete';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator.tsx';
import { Badge } from '@/components/ui/badge.tsx';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string;
  setQuery: (query: string) => void;
}


export function RoleToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table, query, setQuery } = props;
  const rowsSelected = table.getSelectedRowModel().rows;
  const { dialogs, setDialogState } = useDialogStore();
  const { showAlert } = useAlertDialog();
  const mutation = useRoleDelete();
  const handleDelete = async () => {
    await showAlert({
      header: `Xác nhận xóa ${rowsSelected.length} hàng`,
      description: 'Bạn có chắc chắn muốn tiếp tục không?',
      confirmText: 'Xóa',
      asyncAction: async () => mutation.mutate(rowsSelected.map((item:any) => Number(item.original.id)), { onSuccess: () => table.resetRowSelection() }),
    });
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Dialog
          onOpenChange={(open) => setDialogState(KeyDialogs.role, { open })}
          open={dialogs[KeyDialogs.role]?.open}
        >
          <DialogTrigger asChild>
            <Button icon={<Plus className="w-4 h-4 mr-2" />}>
              Thêm mới
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm mới vai trò</DialogTitle>
              <DialogDescription>Điền giá trị vào mẫu để tạo vai trò.</DialogDescription>
            </DialogHeader>
            <RoleForm />
          </DialogContent>
        </Dialog>

        <div>
          <Input
            placeholder="Tìm tên vai trò"
            startIcon={<SearchIcon className="w-4 h-4" />}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-[150px] lg:w-[250px]"
          />
        </div>

        {rowsSelected.length > 0 && (
          <motion.div
            onClick={() => handleDelete()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={cn(buttonVariants({ variant: 'outline' }), 'cursor-pointer group flex items-center')}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span>Xóa</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Badge
              variant="secondary"
              className="px-1.5 flex gap-1 rounded-md font-normal">
              <motion.span
                key={rowsSelected.length}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {rowsSelected.length}
              </motion.span>
              hàng
            </Badge>
          </motion.div>
        )}

      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
