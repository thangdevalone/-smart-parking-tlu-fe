import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header.tsx';
import { History } from '@/types';
import { formatCurrencyVND } from '@/lib/utils';
import { format } from 'date-fns';
import { BACKEND_HOST } from '@/constants';

export const historyColumns: ColumnDef<History>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'imageIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh vào" />
    ),
    cell: ({ row }) => {
      const imageInPath = row.getValue('imageIn') as string;
      const imageUrl = `${BACKEND_HOST}uploads/${imageInPath.split('uploads')[1]}`;
      return (
        <div>
          <img className='h-12 w-12' src={imageUrl} alt="Ảnh vào" />
        </div>
      );
    },
  },
  {
    accessorKey: 'timeIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian vào" />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('timeIn')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'imageOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ảnh ra" />
    ),
    cell: ({ row }) => {
      const imageInPath = row.getValue('imageOut') as string ?? "";
      const imageUrl = `${BACKEND_HOST}uploads/${imageInPath.split('uploads')[1]}`;
      return (
        <div>
        {imageInPath ? <img className='h-12 w-12' src={imageUrl} /> : <h3 className='text-red-600 uppercase font-medium'>chưa checkout</h3> }  
        </div>
      );
    },
  },
  {
    accessorKey: 'timeOut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Thời gian ra" />
    ),
    cell: ({ row }) => <div>{format(new Date(row.getValue('timeOut')), 'dd/MM/yyyy HH:mm:ss')}</div>,
  },
  {
    accessorKey: 'bill',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá tiền" />
    ),
    cell: ({ row }) => {
      const bill = row.getValue('bill') as any;
      return <div>{bill ? formatCurrencyVND(bill.price) : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'bill',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Loại vé" />
    ),
    cell: ({ row }) => {
      const bill = row.getValue('bill') as any;
      return <div>{bill.price ? "Vé ngày" : 'Vé tháng'}</div>;
    },
  },
];
