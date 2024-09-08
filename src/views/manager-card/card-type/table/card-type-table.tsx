import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCardTypeFetcher, useDebounce } from '@/hooks';
import queryString, { ParsedQuery } from 'query-string';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table.tsx';
import { DataTablePagination, TableHeaderComp } from '@/components/common/data-table';
import { LoaderCircle } from 'lucide-react';
import CardTypeToolbar from '@/views/manager-card/card-type/table/card-type-toolbar.tsx';
import cardTypeColumns from '@/views/manager-card/card-type/table/card-type-columns.tsx';

export default function CardTypeTable() {
  const location = useLocation();
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const param = queryString.parse(location.search);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: Number(param?.page || 1) - 1,
    pageSize: Number(param?.limit || 10),
  });
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const debouncedSearchTerm = useDebounce(query, 500);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const paramObject: ParsedQuery = {
    search: query,
    page: String(pagination?.pageIndex ? pagination?.pageIndex + 1 : 1),
    limit: String(pagination.pageSize),
    sortBy: sorting.length ? sorting[0].id : '',
    sortType: !sorting[0]?.desc ? 'asc' : 'desc',
    filters: String(columnFilters),
  };
  const { data, isFetching } = useCardTypeFetcher({
    options: { refetchOnWindowFocus: false, enabled: !!location.search, retry: false },
    queryParam: param,
  });
  useEffect(() => {
    navigate({ search: queryString.stringify(paramObject) }, { replace: true });
  }, [debouncedSearchTerm, sorting, columnFilters, pagination.pageIndex, pagination.pageSize]);
  const table = useReactTable({
    data: data ? data?.data : [],
    columns: cardTypeColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      pagination,
      columnFilters,
    },
    pageCount: data ? data.pagination?.totalPages : 1,
    enableRowSelection: true,
    manualPagination: true,
    autoResetPageIndex: false,
    manualSorting: true,
    manualFiltering: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="gap-4 h-full flex flex-col">
      <CardTypeToolbar table={table} query={query} setQuery={setQuery} />
      <div className="rounded-md flex relative flex-col border min-h-0 flex-1">
        <Table className="">
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
                  colSpan={cardTypeColumns.length}
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
      <div className=" bottom-0 z-[2]">
        <DataTablePagination table={table} totalRows={data?.pagination?.totalItems} />
      </div>
    </div>
  );
}
