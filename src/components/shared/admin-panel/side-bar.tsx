import useAppStore from '@/store/app-store';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, buttonVariants } from '../../ui/button';
import { Menu } from './menu';
import { Logo, LogoCollapse } from '@/special-assets';

export const SideBar = () => {
  const { collapseSidebar, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300',
        !collapseSidebar ? 'w-[90px]' : 'w-72',
      )}
    >
      <div className="invisible lg:visible absolute top-[12px] -right-[16px] z-20">
        <Button
          onClick={toggleSidebar}
          className="rounded-md w-8 h-8"
          variant="outline"
          size="icon"
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform ease-in-out duration-700',
              !collapseSidebar ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </div>
      <div className="relative h-full flex flex-col  py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <Link to="/" className={cn(
          'transition-transform ease-in-out duration-300 mb-1',
          !collapseSidebar ? 'translate-x-1' : 'translate-x-0',
          buttonVariants({ variant: 'link' }),
        )}>
          <div className="w-[150px]">{collapseSidebar ? <Logo /> : <LogoCollapse />}</div>
        </Link>

        <Menu isOpen={collapseSidebar} />
      </div>
    </aside>
  );
};
