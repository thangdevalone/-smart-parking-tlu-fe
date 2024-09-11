import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input.tsx';
import { DataTableViewOptions } from '@/components/common/data-table/data-table-view-options.tsx';
import {  SearchIcon } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  query: string;
  setQuery: (query: string) => void;
}


export function HistoryToolbar<TData>(props: DataTableToolbarProps<TData>) {
  const { table, query, setQuery } = props;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div>
          <Input
            placeholder="Tìm theo loại vé"
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
