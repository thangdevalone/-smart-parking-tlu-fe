import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ContentLayout } from '@/components/layouts';

const TitleMap: Record<string, string> = {
  profile: 'Trang cá nhân',
  password: 'Mật khẩu',
  personalisation: 'Cá nhân hoá',
};

export default function SettingsPage() {
  const location = useLocation();
  const path = location.pathname.split('/').pop() || '';

  const pageTitle = TitleMap[path] || 'Cài đặt'; 

  return (
    <ContentLayout title="Cài đặt">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg flex-1 flex border-none  min-h-0">
        <CardContent className="p-6 flex-1">
          <Outlet />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
