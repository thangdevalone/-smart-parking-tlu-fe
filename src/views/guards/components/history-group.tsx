import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import { TableHeaderComp } from '@/components/common/data-table';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { userColumns } from '@/views/manager-system/user/table/user-columns.tsx';
import { LoaderCircle } from 'lucide-react';
import { historyColumns } from '@/views/manager-history/table/history-columns.tsx';
import { historyApi } from '@/api/historyApi.ts';
import { useEffect, useState } from 'react';
import { ParsedQuery } from 'query-string';

export default function HistoryGroup() {
  const [data, setData] = useState<History[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await historyApi.getHistories({ page: '1', limit: '100' } as ParsedQuery);
        setData(data as unknown as History[]);
      } catch (e) {
        console.log(e);
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  const table = useReactTable({
    data: data as any[],
    columns: historyColumns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className=" flex relative h-full flex-col border-b min-h-0 flex-1">
        <Table>
          <TableHeaderComp className="sticky top-0 z-[20] bg-background" table={table} />
          {!isFetching && <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={userColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>}
        </Table>
        {isFetching && <div
          className="w-full flex-1 items-center flex justify-center"
        >
          <LoaderCircle className="h-4 w-4 animate-spin" />
        </div>}
      </div>
    </>
  );
}