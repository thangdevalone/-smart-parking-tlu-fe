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
import { useAppPath } from '@/hooks';
import { TransactionTable } from '@/views/transations/table/transaction-table.tsx';

export default function TransactionPage() {
  const { basePath } = useAppPath();

  return (
    <ContentLayout title="Lịch sử giao dịch">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={basePath}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Lịch sử giao dịch</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg flex-1 flex border-none min-h-0">
        <CardContent className="p-6 flex-1 overflow-y-auto scroll-custom">
          <TransactionTable />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
