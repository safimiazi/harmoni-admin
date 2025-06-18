"use client";
import React, { useState } from "react";
import BarCharts from "../Charts/BarCharts";
import { LineCharts } from "../Charts/Linechart";

const AllCharts = () => {
  const [bookingsData] = useState([
    { name: "Jan 1", bookings: 220 },
    { name: "Jan 8", bookings: 240 },
    { name: "Jan 15", bookings: 190 },
    { name: "Jan 22", bookings: 210 },
    { name: "Jan 29", bookings: 240 },
    { name: "Feb 5", bookings: 230 },
    { name: "Feb 12", bookings: 210 },
    { name: "Feb 19", bookings: 200 },
    { name: "Feb 26", bookings: 210 },
    { name: "Mar 5", bookings: 220 },
    { name: "Mar 12", bookings: 250 },
    { name: "Mar 19", bookings: 280 },
    { name: "Mar 26", bookings: 250 },
  ]);
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <LineCharts />
      <BarCharts />
    </div>
  );
};

export default AllCharts;
