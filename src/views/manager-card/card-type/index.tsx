import { CardTypeTable } from '@/views/manager-card/card-type/card-type-table.tsx';
import { cardTypeColumns } from '@/views/manager-card/card-type/card-type-columns.tsx';
import { useQuery } from '@tanstack/react-query';
import { cardApi } from '@/api/cardApi.ts';
import type { CardType, SuccessResponse } from '@/types';
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

export default function CardType() {

  const { data, error, isLoading } = useQuery<CardType[], Error>({
    initialData: [],
    queryKey: ['card-type'],
    queryFn: async () => {
      const res = await cardApi.getCardType() as unknown as SuccessResponse<CardType[]>;
      return res.data;
    },
    gcTime: 300000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(data);
  return (
    <ContentLayout title="Loại thẻ">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Loại thẻ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="rounded-lg flex-1 flex border-none mt-6">
        <CardContent className="p-6 flex-1">
          <CardTypeTable columns={cardTypeColumns} data={data} />
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
