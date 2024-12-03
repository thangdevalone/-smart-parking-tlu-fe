import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { ChartContainer } from '@/components/ui/chart.tsx';
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';
import { analyticsApi } from '@/api/analytics.ts';

export default function ProgressStatistic() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.compareMonthly();
        setData(res.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (data && <Card
    className="max-w-xs" x-chunk="charts-01-chunk-2"
  >
    <CardHeader>
      <CardTitle>Thống kê năm</CardTitle>
      <CardDescription>
        Thống kê lưu lượng xe hằng tháng
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          {data.thisMonth.total}
          <span className="text-sm font-normal text-muted-foreground">
                  xe/ngày
                </span>
        </div>
        <ChartContainer
          config={{
            steps: {
              label: 'Steps',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="aspect-auto h-[32px] w-full"
        >
          <BarChart
            accessibilityLayer
            layout="vertical"
            margin={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            data={[
              {
                date: 'This month',
                steps: data.thisMonth.total,
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={4}
              barSize={32}
            >
              <LabelList
                position="insideLeft"
                dataKey="date"
                offset={8}
                fontSize={12}
                fill="white"
              />
            </Bar>
            <YAxis dataKey="date" type="category" tickCount={1} hide />
            <XAxis dataKey="steps" type="number" hide />
          </BarChart>
        </ChartContainer>
      </div>
      <div className="grid auto-rows-min gap-2">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          {data.thisMonth.total}
          <span className="text-sm font-normal text-muted-foreground">
                    xe/ngày
                </span>
        </div>
        <ChartContainer
          config={{
            steps: {
              label: 'Steps',
              color: 'hsl(var(--muted))',
            },
          }}
          className="aspect-auto h-[32px] w-full"
        >
          <BarChart
            accessibilityLayer
            layout="vertical"
            margin={{
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
            }}
            data={[
              {
                date: 'Last month',
                steps: data.thisMonth.total,
              },
            ]}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={4}
              barSize={32}
            >
              <LabelList
                position="insideLeft"
                dataKey="date"
                offset={8}
                fontSize={12}
                fill="hsl(var(--muted-foreground))"
              />
            </Bar>
            <YAxis dataKey="date" type="category" tickCount={1} hide />
            <XAxis dataKey="steps" type="number" hide />
          </BarChart>
        </ChartContainer>
      </div>
    </CardContent>
  </Card>);
}