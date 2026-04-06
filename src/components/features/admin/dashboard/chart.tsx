"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  DailySalesTrend,
  WeeklySalesTrend,
} from "@/lib/api/admin/dashboard/dashboard.type";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

type ChartProp = {
  dailyData: DailySalesTrend[];
  weeklyData: WeeklySalesTrend[];
};

const chartConfig = {
  amount: {
    label: "ยอดขาย",
    color: "#c9a227",
  },
} satisfies ChartConfig;

export default function Chart({ dailyData, weeklyData }: ChartProp) {
  const [view, setView] = useState<"daily" | "weekly">("daily");

  const activeData =
    view === "daily"
      ? dailyData.map((d) => ({ label: d.date, amount: d.totalRevenue }))
      : weeklyData.map((w) => ({ label: w.label, amount: w.totalRevenue }));

  return (
    <div className="card-glass flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-gold font-sarabun">
            แนวโน้มยอดขาย
          </p>
          <p className="text-xs text-white/40 font-sarabun">
            {view === "daily"
              ? "ปริมาณธุรกรรมในช่วง 7 วันที่ผ่านมา"
              : "ปริมาณธุรกรรมในช่วง 4 สัปดาห์ล่าสุด"}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1 border border-white/10">
          <button
            onClick={() => setView("weekly")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sarabun transition-all duration-200 ${
              view === "weekly"
                ? "bg-gold/20 text-gold border border-gold/40"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            รายสัปดาห์
          </button>
          <button
            onClick={() => setView("daily")}
            className={`px-3 py-1.5 rounded-lg text-xs font-sarabun transition-all duration-200 ${
              view === "daily"
                ? "bg-gold/20 text-gold border border-gold/40"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            รายวัน
          </button>
        </div>
      </div>

      <ChartContainer config={chartConfig} className="h-64 w-full">
        <LineChart
          data={activeData}
          margin={{ left: 0, right: 12, top: 10, bottom: 10 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            tick={{
              fill: "rgba(255,255,255,0.3)",
              fontSize: 11,
              fontFamily: "Sarabun",
            }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="amount"
            type="linear"
            stroke="#c9a227"
            strokeWidth={2}
            dot={{ r: 4, fill: "#c9a227" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
