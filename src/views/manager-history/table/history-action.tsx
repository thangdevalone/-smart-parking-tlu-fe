import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pencil } from 'lucide-react';
import { History } from '@/types';
import { useDialogStore } from '@/store/dialog-state-store.ts';
import { Dialog, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog.tsx';
import { BACKEND_HOST, KeyDialogs } from '@/constants';
import { useState } from 'react';

interface HistoryActionsProps {
  row: Row<History>;
}

export function HistoryHandle(props: HistoryActionsProps) {
  const { row } = props;
  const { dialogs, setDialogState } = useDialogStore();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleScaleImage = (imgUrl: string) => {
    setImageUrl(imgUrl);
    setDialogState(KeyDialogs.history, { open: true });
  };

  return (
    <DropdownMenu>
      <Dialog
        onOpenChange={(open) => setDialogState(KeyDialogs.history, { open })}
        open={dialogs[KeyDialogs.history]?.open}
      >
        <DialogContent>
          <DialogHeader>
            <DialogDescription className="p-3">
              {imageUrl ? (
                // `${BACKEND_HOST}uploads/${imageUrl.split('uploads')[1]}`
                <img src={`${BACKEND_HOST}uploads/${imageUrl.split('uploads')[1]}`} alt="Phóng to"
                     className="max-h-[90vh] rounded" />
              ) : (
                'Không có ảnh để hiển thị.'
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleScaleImage(row.original.imageIn)}
        >
          <Pencil className="h-4 mr-2 w-4" />Xem ảnh vào
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => handleScaleImage(row.original.imageOut)}
        >
          <Pencil className="h-4 mr-2 w-4" />Xem ảnh ra
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}