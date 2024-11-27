import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { DataTableColumnHeader } from '@/components/common/data-table/data-table-column-header.tsx';
import { Card } from '@/types/card.ts';
import { ConvertColumnIDs } from '@/constants';
import { format } from 'date-fns';
import { CardHandler } from './card-handler';
import { renderStatus } from '@/components/shared/reuse.tsx';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';

const cardColumns: ColumnDef<Card>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mã" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,

  },
  {
    accessorKey: 'cardCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['cardCode']} />
    ),
    cell: ({ row }) => <div>{row.getValue('cardCode')}</div>,

  },
  {
    accessorKey: 'cardStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['status']} />
    ),
    cell: ({ row }) => <div>{renderStatus(row.getValue('cardStatus'))}</div>,
  },
  {
    accessorKey: 'idCard',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['idCard']} />
    ),
    cell: ({ row }) => <div>{row.getValue('idCard')}</div>,
  },
  {
    accessorKey: 'cardType.cardTypeName',
    header: ({ column }) => <DataTableColumnHeader column={column} title={ConvertColumnIDs['cardTypeName']} />,
    cell: ({ row }) => <div>{row.original.cardType.cardTypeName}</div>,
  },
  {
    accessorKey: 'cardType.cardTypePrice',
    header: ({ column }) => <DataTableColumnHeader column={column} title={ConvertColumnIDs['cardTypePrice']} />,
    cell: ({ row }) => <div>{CurrencyFormatter.toVND(Number(row.original.cardType.cardTypePrice))}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['createdAt']} />
    ),
    cell: ({ row }) => <div>{format(row.getValue('createdAt'), 'dd/MM/yyyy hh:mm:ss')}</div>,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={ConvertColumnIDs['updatedAt']} />
    ),
    cell: ({ row }) => <div>{format(row.getValue('updatedAt'), 'dd/MM/yyyy hh:mm:ss')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => <CardHandler row={row} />,
    enableHiding: false,
  },
];
export default cardColumns;
