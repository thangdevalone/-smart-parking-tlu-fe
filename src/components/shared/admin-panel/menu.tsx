import { cn } from '@/lib/utils';
import { Ellipsis, LogOut } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { SideBarList } from '../../../constants';
import { Button, buttonVariants } from '../../ui/button';
import { ScrollArea } from '../../ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { CollapseMenuButton } from './collapse-menu-button';
import { RoleInApp } from '@/types';
import useAuthStore from '@/store/auth-store.ts';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const { pathname } = useLocation();
  const { role } = useParams();
  const { signOut } = useAuthStore();
  const menuList = SideBarList(pathname, role as Exclude<RoleInApp, RoleInApp.GUARD>);

  return (
    <ScrollArea className="[&>div>div[style]]:!block px-3">
      <nav className="mt-8 h-full w-full">
        <ul
          className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn('w-full', groupLabel ? 'pt-5' : '')} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && true && groupLabel ? (
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="w-full">
                    <div className="w-full flex justify-center items-center">
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
                submenus.length === 0 ? (
                  <div className="w-full" key={index}>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Link to={href}
                              className={cn('w-full !justify-start !h-10 mb-1', buttonVariants({ variant: active ? 'secondary' : 'ghost' }))}>
                            <span className={cn(isOpen === false ? '' : 'mr-4')}>
                              <Icon size={18} />
                            </span>
                          <p
                            className={cn(
                              'max-w-[200px] truncate',
                              isOpen === false
                                ? '-translate-x-96 opacity-0'
                                : 'translate-x-0 opacity-100',
                            )}
                          >
                            {label}
                          </p>
                        </Link>
                      </TooltipTrigger>
                      {isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
                    </Tooltip>
                  </div>
                ) : (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={active}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                ),
              )}
            </li>
          ))}
          <li className="w-full px-3 grow flex items-end">
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  className="w-full justify-center h-10 mt-5"
                >
                  <span className={cn(isOpen === false ? '' : 'mr-4')}>
                    <LogOut size={18} />
                  </span>
                  <p
                    className={cn(
                      'whitespace-nowrap',
                      isOpen === false ? 'opacity-0 hidden' : 'opacity-100',
                    )}
                  >
                    Sign out
                  </p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
            </Tooltip>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  )
    ;
}
