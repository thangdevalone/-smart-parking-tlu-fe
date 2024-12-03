import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb.tsx';
import { Link } from 'react-router-dom';
import { ContentLayout } from '@/components/layouts';
import { useAppPath } from '@/hooks';
import { off, onValue, ref } from 'firebase/database';
import { database } from '@/firebase.ts';
import { useEffect, useState } from 'react';

interface ParkingLot {
  parking_lot_1?: boolean; //240
  parking_lot_2?: boolean; //310
  parking_lot_3?: boolean;
  parking_lot_4?: boolean;
  parking_lot_5?: boolean;
}

export default function CarPositionPage() {
  const { basePath } = useAppPath();
  const [lots, setLots] = useState<ParkingLot>();

  useEffect(() => {
    const connectorLots = ref(database, '/parking_lots');

    onValue(connectorLots, (snapshot) => {
      setLots(snapshot.val());
    });

    return () => {
      off(connectorLots);
    };
  }, []);
  return (
    <ContentLayout title="Chỗ để xe">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={basePath}>Trang chủ</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chỗ để xe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex">
        <div className="relative">
          <img className="h-[600px] border" src="/TLU.png" alt="TLU" />
          {lots?.parking_lot_1 !== undefined && lots?.parking_lot_1 &&
            <img className="w-[100px] absolute z-20 top-[240px] right-10"
                 src="/744465.png" alt={'oto'} />}
          {lots?.parking_lot_2 !== undefined && lots?.parking_lot_2 &&
            <img className="w-[100px] absolute z-20 top-[310px] right-10"
                 src="/744465.png" alt={'oto'} />}
          {lots?.parking_lot_3 !== undefined && lots?.parking_lot_3 &&
            <img className="w-[100px] absolute z-20 top-[375px] right-10"
                 src="/744465.png" alt={'oto'} />}
          {lots?.parking_lot_4 !== undefined && lots?.parking_lot_4 &&
            <img className="w-[100px] absolute z-20 top-[440px] right-10"
                 src="/744465.png" alt={'oto'} />}
          {lots?.parking_lot_5 !== undefined && lots?.parking_lot_5 &&
            <img className="w-[100px] absolute z-20 top-[500px] right-10"
                 src="/744465.png" alt={'oto'} />}
        </div>
      </div>
    </ContentLayout>
  );
}
