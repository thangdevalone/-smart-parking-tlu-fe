import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header.tsx';
import { Bill } from '@/types';
import { formatCurrencyVND } from '@/lib/utils';
import { format } from 'date-fns';

export const billColumns: ColumnDef<Bill>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'startDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian vào" />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('startDate')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'endDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian ra" />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('endDate')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá tiền" />
    ),
    cell: ({ row }) => {
      const bill = row.getValue('price') as number;
      return <div>{bill ? formatCurrencyVND(bill) : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'billStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian ra" />
    ),
    cell: ({ row }) => <div>{row.getValue('billStatus') === 'paid' ? "Đã thanh toán" : "Chưa thanh toán"}</div>,
  },
];
