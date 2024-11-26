import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart.tsx';
import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from 'recharts';

export default function BarStatistic() {
  return (<Card
    className="lg:max-w-md" x-chunk="charts-01-chunk-0"
  >
    <CardHeader className="space-y-0 pb-2">
      <CardDescription>Hôm nay</CardDescription>
      <CardTitle className="text-4xl tabular-nums">
        12,584{' '}
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
          data={[
            {
              date: '2024-01-01',
              steps: 2000,
            },
            {
              date: '2024-01-02',
              steps: 2100,
            },
            {
              date: '2024-01-03',
              steps: 2200,
            },
            {
              date: '2024-01-04',
              steps: 1300,
            },
            {
              date: '2024-01-05',
              steps: 1400,
            },
            {
              date: '2024-01-06',
              steps: 2500,
            },
            {
              date: '2024-01-07',
              steps: 1600,
            },
          ]}
        >
          <Bar
            dataKey="steps"
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
              value="12,343"
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
        <span className="font-medium text-foreground">53,305</span> xe.
      </CardDescription>
     
    </CardFooter>
  </Card>);
}