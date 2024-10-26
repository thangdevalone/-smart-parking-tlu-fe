import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Link, Outlet } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ContentLayout } from '@/components/layouts';
import { useAppPath } from '@/hooks';

export default function UserPage() {
  const { basePath } = useAppPath();
  return (
    <ContentLayout title="Hệ thống">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={basePath}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Hệ thống</BreadcrumbPage>
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
