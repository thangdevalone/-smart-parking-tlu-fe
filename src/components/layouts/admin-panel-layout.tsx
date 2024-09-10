import { cn } from '@/lib/utils';
import { Outlet } from 'react-router-dom';
import { Footer, SideBar } from '../shared/admin-panel';
import useAppStore from '@/store/app-store';

export function AdminPanelLayout() {
  const { collapseSidebar } = useAppStore();

  return (
    <div>
      <SideBar />
      <main
        className={cn(
          'h-[calc(100vh_-_56px)] flex flex-col bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
          !collapseSidebar ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <Outlet />
      </main>
      <footer
        className={cn(
          'transition-[margin-left] ease-in-out duration-300',
          !collapseSidebar ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        <Footer />
      </footer>
    </div>
  );
}
