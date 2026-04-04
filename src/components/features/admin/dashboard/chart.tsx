'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  DailySalesTrend,
  WeeklySalesTrend,
} from '@/lib/api/admin/dashboard/dashboard.type';

import { useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

type ChartProp = {
  dailyData: DailySalesTrend[];
  weeklyData: WeeklySalesTrend[];
};

export default function Chart({ dailyData, weeklyData }: ChartProp) {
  const chartConfig = {
    amount: {
      label: 'ยอดขาย',
      color: '#6d28d9', // ใช้สีหลักของโปรเจกต์
    },
  } satisfies ChartConfig;

  const [view, setView] = useState<'daily' | 'weekly'>('daily');

  const activeData =
    view === 'daily'
      ? dailyData.map((d) => ({ label: d.date, amount: d.totalRevenue }))
      : weeklyData.map((w) => ({ label: w.label, amount: w.totalRevenue }));
  return (
    <Card className="rounded-3xl border border-muted/50 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 pt-1 ">
        <div className="space-y-1.5">
          <CardTitle className="text-xl font-bold font-['Sarabun',sans-serif]">
            แนวโน้มยอดขาย
          </CardTitle>
          <CardDescription className="text-sm font-normal text-muted-foreground font-['Sarabun',sans-serif]">
            {view === 'daily'
              ? 'ปริมาณธุรกรรมในช่วง 7 วันที่ผ่านมา'
              : 'ปริมาณธุรกรรมในช่วง 4 สัปดาห์ล่าสุด'}{' '}
          </CardDescription>
        </div>

        {/* ปุ่มเลือกมุมมอง */}
        <div className="flex items-center gap-1 rounded-full bg-muted p-1 text-muted-foreground text-sm font-medium">
          <Button
            size="sm"
            variant={view === 'weekly' ? 'secondary' : 'ghost'}
            className={`rounded-full px-5 h-9 font-['Sarabun',sans-serif] ${
              view === 'weekly'
                ? 'bg-background text-foreground shadow'
                : 'hover:bg-background/80 hover:text-foreground'
            }`}
            onClick={() => setView('weekly')}
          >
            รายสัปดาห์
          </Button>
          <Button
            size="sm"
            variant={view === 'daily' ? 'secondary' : 'ghost'}
            className={`rounded-full px-5 h-9 font-['Sarabun',sans-serif] ${
              view === 'daily'
                ? 'bg-background text-foreground shadow'
                : 'hover:bg-background/80 hover:text-foreground'
            }`}
            onClick={() => setView('daily')}
          >
            รายวัน
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-70 w-full">
          <LineChart
            accessibilityLayer
            data={activeData}
            margin={{
              left: 0,
              right: 12,
              top: 10,
              bottom: 10,
            }}
          >
            {/* แสดงเส้นตารางแนวนอนแบบประ และซ่อนเส้นตารางแนวตั้ง */}
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="var(--muted)"
            />

            {/* แกน X แสดงวันในสัปดาห์ภาษาไทยฉบับย่อ (จ., อ., พ., ...) */}
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              className="font-['Sarabun',sans-serif] text-xs font-medium text-muted-foreground"
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* กราฟเส้น */}
            <Line
              dataKey="amount"
              type="linear"
              stroke="var(--color-amount)"
              strokeWidth={2}
              dot={{ r: 4, fill: 'var(--color-sales)' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
