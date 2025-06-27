"use client";

import { useGetDashboardStatsQuery } from "@/redux/features/user/adminApi";
import React from "react";

const CalculateCard = () => {
  const { data: response, isLoading, error } = useGetDashboardStatsQuery({});
  const stats = response?.data;

  const data = [
    {
      title: "Overall Revenue",
      amount: stats ? `$${stats.revenue.total.toLocaleString()}` : "-",
      unit: "total revenue earned",
    },
    {
      title: "Recurring Revenue",
      amount: stats ? `$${stats.revenue.recurring.toLocaleString()}` : "-",
      unit: "from recurring plans",
    },
    {
      title: "One-Time Revenue",
      amount: stats ? `$${stats.revenue.oneTime.toLocaleString()}` : "-",
      unit: "from one-time plans",
    },
    {
      title: "Total Registrations",
      amount: stats ? `${stats.userCount} users` : "-",
      unit: "users registered on platform",
    },
    {
      title: "Verified Users",
      amount: stats ? `${stats.verifiedUserCount}` : "-",
      unit: "with verified email",
    },
 
    {
      title: "Total Subscriptions",
      amount: stats ? `${stats.subscriptionCount.total}` : "-",
      unit: "active subscriptions",
    },
    {
      title: "Recurring Subscriptions",
      amount: stats ? `${stats.subscriptionCount.recurring}` : "-",
      unit: "auto-renewing plans",
    },
    {
      title: "One-Time Subscriptions",
      amount: stats ? `${stats.subscriptionCount.oneTime}` : "-",
      unit: "non-recurring plans",
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load stats</p>;

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((single) => (
          <div
            key={single.title}
            className="p-5 sm:p-6 bg-white rounded-2xl shadow-md flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-sm sm:text-base font-bold text-gray-700">
                {single.title}
              </h1>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600">
                {single.amount}
              </h2>
              <p className="text-sm text-gray-500">{single.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Subscriptions Per Plan */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Subscriptions Per Plan</h2>

        {stats?.subscriptionsPerPlan?.length > 0 ? (
          <div className="space-y-4">
            {stats.subscriptionsPerPlan.map((plan : any) => (
              <div
                key={plan.planId}
                className="border border-gray-200 rounded-lg p-4"
              >
                <h3 className="text-md font-semibold text-gray-700">
                  {plan.planName}
                </h3>
                <p className="text-sm text-gray-500">{plan.usedCase}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{plan.count}</span> subscriptions
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No plan data available.</p>
        )}
      </div>
    </div>
  );
};

export default CalculateCard;
