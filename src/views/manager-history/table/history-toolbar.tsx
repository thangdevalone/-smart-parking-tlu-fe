import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options.tsx';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;

}


export function HistoryToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div>

        </div>
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
