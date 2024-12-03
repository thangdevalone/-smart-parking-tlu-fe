import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { analyticsApi } from '@/api/analytics.ts';

export default function LineStatistic() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.monthlyRevenue();
        setData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (data && <Card
    className="flex flex-col lg:max-w-md" x-chunk="charts-01-chunk-1"
  >
    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
      <div>
        <CardDescription>Tiền hôm nay</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          {data.total}
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
              VND
                </span>
        </CardTitle>
      </div>
      <div>
        <CardDescription>Cao nhất</CardDescription>
        <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
          {data.maxValue}
          <span className="text-sm font-normal tracking-normal text-muted-foreground">
               VND
                </span>
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex flex-1 items-center">
      <ChartContainer
        config={{
          resting: {
            label: 'Resting',
            color: 'hsl(var(--chart-1))',
          },
        }}
        className="w-full"
      >
        <LineChart
          accessibilityLayer
          margin={{
            left: 14,
            right: 14,
            top: 10,
          }}
          data={data.data}
        >
          <CartesianGrid
            strokeDasharray="4 4"
            vertical={false}
            stroke="hsl(var(--muted-foreground))"
            strokeOpacity={0.5}
          />
          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString('en-US', {
                weekday: 'short',
              });
            }}
          />
          <Line
            dataKey="resting"
            type="natural"
            fill="var(--color-resting)"
            stroke="var(--color-resting)"
            strokeWidth={2}
            dot={false}
            activeDot={{
              fill: 'var(--color-resting)',
              stroke: 'var(--color-resting)',
              r: 4,
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="line"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  });
                }}
              />
            }
            cursor={false}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>);
}