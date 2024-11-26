import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { KeyDialogs } from '@/constants';
import { Button } from '@/components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { BillForm } from '@/views/manager-pay/manager-bill/form/bill-form.tsx';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;

}


export function BillToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table } = props;
  const { dialogs, setDialogState } = useDialogStore();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div>
          <Dialog
            onOpenChange={(open) => setDialogState(KeyDialogs.bill, { open })}
            open={dialogs[KeyDialogs.bill]?.open}
          >
            <DialogTrigger asChild>
              <Button icon={<Plus className="w-4 h-4 mr-2" />}>
                Thêm mới
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Thêm hoá đơn</DialogTitle>
                <DialogDescription>Điền giá trị vào mẫu để tạo hoá đơn</DialogDescription>
              </DialogHeader>
              <BillForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
