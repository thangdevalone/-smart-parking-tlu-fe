import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input.tsx';
import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Plus, SearchIcon } from 'lucide-react';
import { useAppPath } from '@/hooks';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string;
  setQuery: (query: string) => void;
}


export function UserToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table, query, setQuery } = props;
  const { navigateAppPath } = useAppPath();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Button onClick={() => navigateAppPath(['user', 'form?type=create'])} icon={<Plus className="w-4 h-4 mr-2" />}>
          Thêm mới
        </Button>
        <div>
          <Input
            placeholder="Tìm tên loại thẻ"
            startIcon={<SearchIcon className="w-4 h-4" />}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-[150px] lg:w-[250px]"
          />
        </div>
      </div>

      <DataTableViewOptions table={table} />
    </div>
  );
}
