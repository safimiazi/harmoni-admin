"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { VictoryLabel, VictoryPie } from "victory";

const barData = [
  { name: "Jan", Ads: 6.4, Subscriptions: 7.5, Bookings: 9 },
  { name: "Feb", Ads: 6.4, Subscriptions: 7.9, Bookings: 9 },
  { name: "Mar", Ads: 4, Subscriptions: 8.5, Bookings: 10 },
  { name: "Apr", Ads: 7.3, Subscriptions: 6, Bookings: 9 },
  { name: "May", Ads: 8.3, Subscriptions: 9.2, Bookings: 8 },
  { name: "Jun", Ads: 4, Subscriptions: 8.1, Bookings: 9.9 },
];
// const donutData = [
//   { name: "Subscriptions", value: 26.9 },
//   { name: "Bookings", value: 48.8 },
//   { name: "Ads", value: 24.3 },
// ];

const donutData2 = [
  { x: "Subscriptions", y: 26.9 },
  { x: "Bookings", y: 48.8 },
  { x: "Ads", y: 24.3 },
];

const COLORS = ["#6CB9AD", "#324DDD", "#272A3E"];

export default function RevenueDashboard() {
  return (
    <div className="w-full pt-10 font-Robot">
      <h2 className="text-[var(--color-accent)] text-sm sm:text-lg tracking-[-0.4px] leading-[12px] sm:leading-[24px] font-semibold font-Robot mb-4">
        Total Revenue Breakdown
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <Card className="lg:col-span-2 bg-[#E6EBF0] shadow-none rounded-[8px]">
          <CardContent className="p-4">
            <div className="h-[320px] bg-[#E6EBF0]  rounded-[8px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  style={{ fontSize: 12, fill: "#272A3E", fontWeight: 800 }}
                  barCategoryGap="10%"
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    style={{ fontSize: 14, fill: "#272A3E", fontWeight: 700 }}
                  />
                  <YAxis
                    tickFormatter={(val) => `${val}k`}
                    domain={[0, 11]}
                    style={{ fontSize: 14, fill: "#C0C0C0", fontWeight: 700 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#E6EBF0",
                      borderRadius: "2px",
                      border: "none",
                      color: "#fff",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    labelStyle={{ display: "none" }}
                    cursor={{ fill: "#DDE2EB" }}
                  />
                  <Legend iconType="rect" />
                  <Bar dataKey="Ads" fill="#6CB9AD">
                    <LabelList
                      dataKey="Ads"
                      position="top"
                      formatter={(val: number) => `${val}k`}
                      style={{ fontSize: 12, fill: "#6CB9AD", fontWeight: 400 }}
                    />
                  </Bar>
                  <Bar dataKey="Subscriptions" fill="#324DDD">
                    <LabelList
                      dataKey="Subscriptions"
                      position="top"
                      formatter={(val: number) => `${val}k`}
                      style={{ fontSize: 12, fill: "#324DDD", fontWeight: 400 }}
                    />
                  </Bar>
                  <Bar dataKey="Bookings" fill="#272A3E">
                    <LabelList
                      dataKey="Ads"
                      position="top"
                      formatter={(val: number) => `${val}k`}
                      style={{ fontSize: 12, fill: "#272A3E", fontWeight: 400 }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donut Chart */}

        <div className="bg-[#FBF7EB] pt-10 rounded-[8px] flex items-center justify-center">
          <div className="relative w-full h-full">
            <svg
              viewBox="-30 25 450 300"
              className="max-w-[650px] h-fit mx-auto"
            >
              <VictoryPie
                standalone={false}
                width={400}
                height={350}
                data={donutData2}
                innerRadius={55}
                labelRadius={80}
                labelPlacement={"perpendicular"}
                labelPosition={"centroid"}
                style={{
                  data: {
                    fill: ({ index }) =>
                      typeof index === "number"
                        ? COLORS[index % COLORS.length]
                        : COLORS[0],
                    stroke: "#FBF7EB",
                    strokeWidth: 2,
                  },
                  labels: {
                    fill: "#fff",
                    fontSize: 13,
                    fontWeight: "bold",
                  },
                }}
                labels={({ datum }) => `${datum.x}\n${datum.y}%`}
              />
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 13,
                  fontFamily: "var[(--font-roboto)]",
                  fontWeight: 600,
                }}
                x={200}
                y={175}
                text="Users in %"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
