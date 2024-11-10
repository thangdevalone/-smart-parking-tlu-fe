import { Logo } from '@/special-assets';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChartNoAxesCombined, LogOut } from 'lucide-react';
import StatisticGroup from '@/views/guards/components/statistic-group.tsx';
import useAuthStore from '@/store/auth-store.ts';
import { useNavigate } from 'react-router-dom';

export default function GuardHeader() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  return (
    <header className="h-[70px] flex justify-center flex-row relative items-center bg-default-blue">
      <Logo impTheme="dark" className="w-[150px] absolute left-5" />
      <h1 className="text-white text-xl font-bold">Hệ thống quản lí bãi đỗ xe Đại học Thăng Long</h1>
      <Button className="absolute xl:right-5 right-40" variant="outline" onClick={() => {
        signOut();
        navigate('/');
      }}
              icon={<LogOut className="w-4 h-4 mr-2" />}>
        Đăng xuất
      </Button>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            autoFocus={false}
            className="xl:hidden flex absolute right-5"
            variant="outline"
            icon={<ChartNoAxesCombined className=" w-4 h-4 mr-2" />}>Statistics</Button></SheetTrigger>
        <SheetContent>
          <div className="flex flex-col space-y-2">
            <p className="text-lg font-medium">Statistics</p>
            <StatisticGroup />
          </div>
        </SheetContent>
      </Sheet>

    </header>
  );
}