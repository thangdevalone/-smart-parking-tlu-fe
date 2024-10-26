'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ParkingLog = {
  id: string;
  parking_card: string;
  entry_time: string;
  exit_time?: string | null;
  money?: number | null;
  entry_image: string;
  exit_image?: string | null;
};

export const columns: ColumnDef<ParkingLog>[] = [
  {
    accessorKey: 'parking_card',
    header: 'Mã số thẻ',
  },
  {
    accessorKey: 'entry_time',
    header: 'Thời gian vào',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (value) {
        return format(new Date(value), 'dd/MM/yyyy HH:mm:ss');
      } else {
        return 'No time in';
      }
    },
  },
  {
    accessorKey: 'exit_time',
    header: 'Thời gian ra',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      if (value) {
        return format(new Date(value), 'dd/MM/yyyy HH:mm:ss');
      } else {
        return 'No time out';
      }
    },
  },
  {
    accessorKey: 'money',
    header: 'Phí gửi xe',
    cell: ({ getValue }) => {
      const val = getValue<number>();
      if (val) {
        return CurrencyFormatter.toVND(val);
      } else {
        return 'No money';
      }
    },
  },
];
