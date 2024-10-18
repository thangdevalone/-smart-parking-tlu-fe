import { Link, Outlet, useLocation } from 'react-router-dom';
import { CaretLeftIcon } from '@radix-ui/react-icons';
import { Lock, UserRound, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils.ts';
import { buttonVariants } from '@/components/ui/button.tsx';
import { Separator } from '@radix-ui/react-separator';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import { useAppPath } from '@/hooks';


export default function SettingsPage() {
  const { pathname } = useLocation();
  const { basePath } = useAppPath();
  const sidebarNavItems = [
    {
      title: 'Thông tin cá nhân',
      href: `${basePath}/settings/profile`,
      icon: <UserRound />,
    },
    {
      title: 'Quản lý mật khẩu',
      href: `${basePath}/settings/password`,
      icon: <Lock />,
    },
    {
      title: 'Cá nhân hóa',
      href: `${basePath}/settings/personalisation`,
      icon: <Wand2 />,
    },
  ];
  return (
    <ScrollArea className="h-screen">
      <Link to={`${basePath}/dashboard`} className="flex w-fit flex-row items-center font-semibold mt-4 mb-3 ml-8">
        <CaretLeftIcon className="w-7 h-7" /> Trang chủ
      </Link>
      <div className=" space-y-6 px-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Cài đặt chung</h2>
          <p className="text-muted-foreground">
            Quản lý cài đặt tài khoản, mật khẩu của bạn và tùy chỉnh cá nhân hóa,...
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {sidebarNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    pathname === item.href
                      ? 'bg-muted hover:bg-muted'
                      : 'hover:bg-muted',
                    'justify-start',
                    'gap-2 h-10',
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
          <div className="flex-1 max-w-2xl lg:max-w-3xl xl:max-w-5xl">
            <Outlet />
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
