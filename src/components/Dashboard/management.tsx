"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import Wrapper from "../wrapper/wrapper";
import LineCharts from "@/components/Dashboard/LineCharts";
import PieCharts from "@/components/Dashboard/PieChart";

const Management = () => {
  return (
    <Wrapper>
      <div>
        <div className="flex justify-end  mb-3">
          <Select>
            <SelectTrigger className="max-w-[140px] bg-white border-[#EBEBEB] text-base text-primary">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30 days">30 days</SelectItem>
              <SelectItem value="3 months">3 months</SelectItem>
              <SelectItem value="6 months">6 months</SelectItem>
              <SelectItem value="12 months">12 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Right side - Line chart */}
        <div className="flex flex-col xl:flex-row  gap-x-4 w-full space-y-3">
          <LineCharts />
          <PieCharts />
        </div>
      </div>
    </Wrapper>
  );
};

export default Management;
