"use client";

import { useGetDashboardAnalyticsQuery } from "@/redux/features/user_managment/user_management";
import { MoreHorizontal } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// interface BookingsChartProps {
//   data: {
//     name: string;
//     bookings: number;
//   }[];
// }

export function LineCharts() {
  const { data, isLoading } = useGetDashboardAnalyticsQuery();
  console.log(data?.data?.monthlyBookingTrends, "linecharts");
  return (
    <div className="rounded-2xl bg-[var(--color-accent)] p-6 text-white h-full shadow-md w-full sm:w-1/2 font-Robot">
      <div className="flex justify-between items-start space-y-8">
        <div className="space-y-3">
          <p className="text-[15px] leading-[20px] font-bold text-[var(--color-boldTextTwo)]">
            Bookings
          </p>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-[var(--color-boldTextTwo)]">
              2,345
            </h2>
            <p className="text-green-400 text-xs">+8% this month</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white cursor-pointer">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.1)"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            tickFormatter={(value) => {
              // Only show Jan, Feb, Mar labels
              if (value === "Jan 1") return "Jan";
              if (value === "Feb 5") return "Feb";
              if (value === "Mar 5") return "Mar";
              return "";
            }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            domain={[100, 300]}
            ticks={[100, 150, 200, 250, 300]}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0,0,0,0.8)",
              border: "none",
              borderRadius: "4px",
              color: "white",
              fontSize: 12,
            }}
            labelStyle={{ color: "white" }}
          />
          <Line
            type="monotone"
            dataKey="bookings"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#3b82f6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
