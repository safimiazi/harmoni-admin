"use client";

import { useGetDashboardStatsQuery } from "@/redux/features/user/userApi";
import React from "react";

const CalculateUserCard = () => {
    const { data: response, isLoading, error } = useGetDashboardStatsQuery({});
    const stats = response?.data;

    const data = [

   
 
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
            title: "Unverified Users",
            amount: stats ? `${stats.unverifiedUserCount}` : "-",
            unit: "pending verification",
        }
    ];

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Failed to load stats</p>;

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
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

        </div>
    );
};

export default CalculateUserCard;
