import { MenuIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { Link } from 'react-router-dom';
import { Menu } from './menu';
import { cn } from '@/lib/utils.ts';
import { Logo } from '@/special-assets';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <div>
            <Link to="/" className={cn(
              'transition-transform w-fit ease-in-out duration-300 mb-1',
              buttonVariants({ variant: 'link' }),
            )}>
              <div className="w-[150px]"><Logo /></div>
            </Link>
          </div>
        </SheetHeader>
        <Menu isOpen={true} />
      </SheetContent>
    </Sheet>
  );
}
