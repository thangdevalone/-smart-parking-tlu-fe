import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { analyticsApi } from '@/api/analytics.ts';

export default function BarStatistic() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.weekly();
        setData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  console.log(data);
  return (data && <Card
    className="lg:max-w-md" x-chunk="charts-01-chunk-0"
  >
    <CardHeader className="space-y-0 pb-2">
      <CardDescription>Hôm nay</CardDescription>
      <CardTitle className="text-4xl tabular-nums">
        {data.today}{' '}
        <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                Xe
              </span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          steps: {
            label: 'Steps',
            color: 'hsl(var(--chart-1))',
          },
        }}
      >
        <BarChart
          accessibilityLayer
          margin={{
            left: -4,
            right: -4,
          }}
          data={data.data}
        >
          <Bar
            dataKey="value"
            fill="var(--color-steps)"
            radius={5}
            fillOpacity={0.6}
            activeBar={<Rectangle fillOpacity={0.8} />}
          />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => {
              return new Date(value).toLocaleDateString('en-US', {
                weekday: 'short',
              });
            }}
          />
          <ChartTooltip
            defaultIndex={2}
            content={
              <ChartTooltipContent
                hideIndicator
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
          <ReferenceLine
            y={1200}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="3 3"
            strokeWidth={1}
          >
            <Label
              position="insideBottomLeft"
              value="Trung bình xe"
              offset={10}
              fill="hsl(var(--foreground))"
            />
            <Label
              position="insideTopLeft"
              value={data.average}
              className="text-lg"
              fill="hsl(var(--foreground))"
              offset={10}
              startOffset={100}
            />
          </ReferenceLine>
        </BarChart>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-1">
      <CardDescription>
        Trong 7 ngày qua, tổng xe đã vào trong bãi là{' '}
        <span className="font-medium text-foreground">{data.total}</span> xe.
      </CardDescription>

    </CardFooter>
  </Card>);
}