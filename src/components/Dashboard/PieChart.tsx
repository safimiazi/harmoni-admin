import { useUserAnalyticsForBarChartsQuery } from "@/redux/features/user_managment/user_analytics";
import React from "react";
import { VictoryPie, VictoryLabel } from "victory";
const PieCharts = () => {
  const { data } = useUserAnalyticsForBarChartsQuery();
  const donutData = data?.data?.map((item: any) => ({
    x: item.role,
    y: item.percentage,
  }));
  const COLORS = ["#6CB9AD", "#324DDD", "#D4AF37"];
  return (
    <div className="w-full xl:w-[40%] mx-auto relative font-Robot bg-[#FBF7EB] rounded-2xl">
      <svg viewBox="-30 25 450 300" className="max-w-[650px] h-fit mx-auto">
        <VictoryPie
          standalone={false}
          width={400}
          data={donutData}
          height={350}
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
  );
};

export default PieCharts;
