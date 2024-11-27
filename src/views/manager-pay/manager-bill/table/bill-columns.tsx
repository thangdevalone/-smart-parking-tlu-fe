import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header.tsx';
import { Bill } from '@/types';
import { format } from 'date-fns';
import { ConvertColumnIDs } from '@/constants';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';

export const billColumns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['id']} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['billStartDate']} />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('startDate')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['billEndDate']} />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('endDate')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['price']} />
    ),
    cell: ({ row }) => {
      const bill = row.getValue('price') as number;
      return <div>{bill ? CurrencyFormatter.toVND(bill) : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['user']} />
    ),
    cell: ({ row }) => <div>{row.original.user.fullName}</div>,
  },
];
