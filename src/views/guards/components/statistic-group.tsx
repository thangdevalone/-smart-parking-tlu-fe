import { Card } from '@/components/ui/card.tsx';
import { HandCoins, Split } from 'lucide-react';
import { CurrencyFormatter } from '@/lib/currency-formater.ts';
import { LineChartGuard } from '@/views/guards/components/charts';
import { format } from 'date-fns';

export default function StatisticGroup() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-bold">Lưu lượng xe ra vào ({format(new Date(), 'MM/yyyy')})</p>
          <Split className="w-5 h-5" />
        </div>
        <p className="text-2xl mt-1 font-bold">1000 xe</p>
        <span className="text-muted-foreground block text-xs">
                Statistics
              </span>
      </Card>
      <Card className="p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-bold">Tổng thu nhập ({format(new Date(), 'MM/yyyy')})</p>
          <HandCoins className="w-5 h-5" />
        </div>
        <p className="text-2xl mt-1 font-bold text-[red]">
          {CurrencyFormatter.toVND(100000)}
        </p>
        <span className="text-muted-foreground block text-xs">
                Statistics
              </span>
      </Card>
      <Card className="p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="text-lg font-bold">Lưu lượng xe ra vào</p>
          <Split className="w-5 h-5" />
        </div>
        <p className="text-2xl mt-1 font-bold">1000</p>
        <span className="text-muted-foreground block text-xs">
                Statistics
              </span>
      </Card>
      <LineChartGuard />
    </div>
  );
}