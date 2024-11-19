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
import CardTable from './table/card-table';
import { useAppPath } from '@/hooks';

export default function CardPage() {
  const { basePath } = useAppPath();
  return (
    <ContentLayout title="Thẻ Cứng">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={basePath}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Thẻ Cứng</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg flex-1 flex border-none  min-h-0">
        <CardContent className="p-6 flex-1 overflow-y-auto scroll-custom">
          <CardTable />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
