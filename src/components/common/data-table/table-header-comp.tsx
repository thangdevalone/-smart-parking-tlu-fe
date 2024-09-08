import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { flexRender, Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils.ts';

interface ITableHeader<TData> {
  table: Table<TData>;
  className?: string;
}

export function TableHeaderComp<TData>({ table, className }: ITableHeader<TData>) {
  return (<TableHeader className={cn(className)}>
    {table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableHead key={header.id} className='rounded-md' colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
            </TableHead>
          );
        })}
      </TableRow>
    ))}
  </TableHeader>);
}
