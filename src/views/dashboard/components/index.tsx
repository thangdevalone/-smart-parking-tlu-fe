import { Bar, BarChart, LabelList, Rectangle, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import BarStatistic from '@/views/dashboard/components/bar-statistic.tsx';
import LineStatistic from '@/views/dashboard/components/line-statistic.tsx';
import ProgressStatistic from '@/views/dashboard/components/progress-statistic.tsx';
import { useEffect, useState } from 'react';
import { analyticsApi } from '@/api/analytics.ts';

export function Charts() {
  const [data, setData] = useState<any>();
  const [data2, setData2] = useState<any>();
  useEffect(() => {
    (async () => {
      try {
        const res = await analyticsApi.lastSevenDays();
        const res2 = await analyticsApi.inOut();
        setData(res.data.data);
        setData2(res2.data.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    <div
      className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <BarStatistic />
        <LineStatistic />
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-1 w-full flex-1 gap-6 lg:max-w-[20rem]">
        <ProgressStatistic />
        {data && <Card
          className="max-w-xs" x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Lưu lượng xe vào</CardTitle>
            <CardDescription>
              Trong vòng 7 ngày qua bãi đỗ xe đã có lưu lượng khoảng {Math.floor(data.value) || 1} xe mỗi ngày
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              {Math.floor(data.value) || 1}
              <span className="text-sm font-normal text-muted-foreground">
                xe/ngày
              </span>
            </div>
            <ChartContainer
              config={{
                steps: {
                  label: 'Value',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="ml-auto w-[72px]"
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
                data={data.data}
              >
                <Bar
                  dataKey="value"
                  fill="var(--color-steps)"
                  radius={2}
                  fillOpacity={0.2}
                  activeIndex={6}
                  activeBar={<Rectangle fillOpacity={0.8} />}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                  hide
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>}
        {data2 && <Card
          className="max-w-xs" x-chunk="charts-01-chunk-4"
        >
          <CardContent className="flex gap-4 p-4 pb-2">
            <ChartContainer
              config={{
                move: {
                  label: 'Xe vào',
                  color: 'hsl(var(--chart-1))',
                },
                stand: {
                  label: 'Xe ra',
                  color: 'hsl(var(--chart-2))',
                },

              }}
              className="h-[140px] w-full"
            >
              <BarChart
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 10,
                }}
                data={[
                  {
                    activity: 'Xe vào',
                    value: (Number(data2.in) / Number(data2.in + data2.out)) * 100,
                    label: `${data2.in} xe`,
                    fill: 'var(--color-stand)',
                  },
                  {
                    activity: 'Xe ra',
                    value: (Number(data2.out) / Number(data2.in + data2.out)) * 100,
                    label: `${data2.out} xe`,
                    fill: 'var(--color-exercise)',
                  },

                ]}
                layout="vertical"
                barSize={32}
                barGap={2}
              >
                <XAxis type="number" dataKey="value" hide />
                <YAxis
                  dataKey="activity"
                  type="category"
                  tickLine={false}
                  tickMargin={4}
                  axisLine={false}
                  className="capitalize"
                />
                <Bar dataKey="value" radius={5}>
                  <LabelList
                    position="insideLeft"
                    dataKey="label"
                    fill="white"
                    offset={8}
                    fontSize={12}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex flex-row border-t p-4">
            <div className="flex w-full items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Xe vào</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {Number(data2.in)}
                  <span className="text-sm font-normal text-muted-foreground">
                    Xe
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Xe ra</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  {Number(data2.out)}
                  <span className="text-sm font-normal text-muted-foreground">
                    Xe
                  </span>
                </div>
              </div>

            </div>
          </CardFooter>
        </Card>}
      </div>
    </div>
  );
}