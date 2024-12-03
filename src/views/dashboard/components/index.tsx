import { Bar, BarChart, LabelList, Rectangle, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';
import BarStatistic from '@/views/dashboard/components/bar-statistic.tsx';
import LineStatistic from '@/views/dashboard/components/line-statistic.tsx';
import ProgressStatistic from '@/views/dashboard/components/progress-statistic.tsx';

export function Charts() {

  return (
    <div
      className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-2 lg:max-w-[22rem] lg:grid-cols-1 xl:max-w-[25rem]">
        <BarStatistic />
        <LineStatistic />
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-1 w-full flex-1 gap-6 lg:max-w-[20rem]">
        <ProgressStatistic />
        <Card
          className="max-w-xs" x-chunk="charts-01-chunk-3"
        >
          <CardHeader className="p-4 pb-0">
            <CardTitle>Lưu lượng xe vào</CardTitle>
            <CardDescription>
              Trong vòng 7 ngày qua bãi đỗ xe đã có lưu lượng khoảng 120 xe mỗi ngày
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
            <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
              120
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
        </Card>
        <Card
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
                    value: (8 / 12) * 100,
                    label: '100 xe',
                    fill: 'var(--color-stand)',
                  },
                  {
                    activity: 'Xe ra',
                    value: (46 / 60) * 100,
                    label: '34 xe',
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
                  100
                  <span className="text-sm font-normal text-muted-foreground">
                    Xe
                  </span>
                </div>
              </div>
              <Separator orientation="vertical" className="mx-2 h-10 w-px" />
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-xs text-muted-foreground">Xe ra</div>
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  34
                  <span className="text-sm font-normal text-muted-foreground">
                    Xe
                  </span>
                </div>
              </div>

            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}