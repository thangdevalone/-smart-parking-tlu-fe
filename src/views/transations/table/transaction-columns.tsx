import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header.tsx';
import { Transaction } from '@/types';
import { ConvertColumnIDs } from '@/constants';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';
import { format } from 'date-fns';

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['id']} />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'user',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['user']} />
    ),
    cell: ({ row }) => <div>{row.original.user.fullName}</div>,
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['amount']} />
    ),
    cell: ({ row }) => <div>{CurrencyFormatter.toVND(Number(row.getValue('amount')))}</div>,
  },
  {
    accessorKey: 'bankCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['bankCode']} />
    ),
    cell: ({ row }) => <div>{row.getValue('bankCode') ?? '-'}</div>,
  },
  {
    accessorKey: 'payDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['payDate']} />
    ),
    cell: ({ row }) => <div>{format(row.getValue('payDate'), 'dd/MM/yyyy hh:mm:ss')}</div>,
  },
];
