import { CardTypeTable } from '@/views/manager-card/card-type/card-type-table.tsx';
import { cardTypeColumns } from '@/views/manager-card/card-type/card-type-columns.tsx';

export default function CardType() {

  return (
    <CardTypeTable columns={cardTypeColumns} />
  );
}
