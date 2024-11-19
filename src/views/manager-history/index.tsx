import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { ContentLayout } from '@/components/layouts';
import { HistoryTable } from './table/history-table';
import { useAppPath } from '@/hooks';

export default function HistoryPage() {
  const { basePath } = useAppPath();

  return (
    <ContentLayout title="Danh mục hình ảnh">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={basePath}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Danh mục hình ảnh</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg flex-1 flex border-none  min-h-0">
        <CardContent className="p-6 flex-1 overflow-y-auto scroll-custom">
          <HistoryTable />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
