import { DotsHorizontalIcon } from '@radix-ui/react-icons';import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export function DataTableRowActions() {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer"><Eye className="h-4 mr-2 w-4" /> Xem</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer"><Pencil className="h-4 mr-2 w-4" /> Chỉnh sửa</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Trash2 className="h-4 mr-2 w-4" /> Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
