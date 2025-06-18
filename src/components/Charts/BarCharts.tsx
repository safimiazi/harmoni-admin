"use client";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";
const BarCharts = () => {
  const data = [
    { name: "Jan", pv: 120000 },
    { name: "Feb", pv: 180000 },
    { name: "Mar", pv: 300000 },
    { name: "April", pv: 320000 },
    { name: "May", pv: 280000 },
    { name: "June", pv: 400000 },
  ];
  
  return (
    <div className="rounded-2xl bg-[var(--color-accent)] p-6 text-white h-full shadow-md w-full sm:w-1/2">
      <div className="flex justify-between items-start space-y-8">
        <div className="space-y-3">
          <p className="text-[15px] leading-[20px] font-bold text-[var(--color-boldTextTwo)]">
            Earnings
          </p>
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-[var(--color-boldTextTwo)]">
              7.7k
            </h2>
            <p className="text-green-400 text-xs">+2.1% last mo</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white cursor-pointer">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
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
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            stroke="#ffffff33"
            fontSize={12}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              backgroundColor: "#1e1e2f",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: 12,
            }}
          />
          <Bar dataKey="pv" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={45} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarCharts;
