import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock, LogOut, Settings } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import defaultAvatar from '@/assets/default-avatar.png';
import useAuthStore from '@/store/auth-store.ts';

export function UserNav() {
  const { user, signOut } = useAuthStore();
  const { role } = useParams();
  return (
    <DropdownMenu>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={defaultAvatar} alt="Avatar" />
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">Profile</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to={`/${role}/settings/profile`} className="flex items-center">
              <Settings className="w-4 h-4 mr-3 text-muted-foreground" />
              Cài đặt
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to={`/${role}/settings/password`} className="flex items-center">
              <Lock className="w-4 h-4 mr-3 text-muted-foreground" />
              Đổi mật khẩu
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer" onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
