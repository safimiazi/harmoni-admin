"use client";

import CalculateCard from "@/components/reuseabelComponents/calculateCard";
import Title from "@/components/reuseabelComponents/Title";
import AllCharts from "@/components/Dashboard/AllCharts";
import Wrapper from "@/components/wrapper/wrapper";

const DashboardPage = () => {
  return (
    <Wrapper>
      <div className="w-full  min-h-screen space-y-4 ">
        <Title title="Admin Dashboard" />

        <div className="space-y-5">
          <CalculateCard />
        </div>
        <div className="space-y-5">
          <h1 className="text-[var(--color-accent)] text-sm sm:text-lg tracking-[-0.4px] leading-[12px] sm:leading-[24px] font-semibold font-Robot">
            Total Registration & Earning Insights
          </h1>
          <AllCharts />
        </div>

        {/*  <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
          <Calendar />
        </div> */}
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
