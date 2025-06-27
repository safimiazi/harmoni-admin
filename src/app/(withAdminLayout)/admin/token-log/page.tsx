"use client";

import { useTokenLogQuery } from "@/redux/features/user/adminApi";
import { useState } from "react";
import profile from "../../../../assets/images/profile.png";
import toast from "react-hot-toast";

const TokenLogPage = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading, error } = useTokenLogQuery({
        page: Math.max(page - 1, 0),
        limit,
        searchTerm,
    });

    const logs = data?.data?.result || [];
    const meta = data?.data?.meta;

    const handleSearch = (value: string) => {
        setPage(1);
        setSearchTerm(value);
    };

    if (isLoading) return <p className="p-5">Loading token logs...</p>;
    if (error) {
        toast.error("Failed to load token logs");
        return <p className="p-5 text-red-500">Failed to load token logs.</p>;
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <h2 className="text-xl font-bold">Token & Plan Logs</h2>

                <div className="flex flex-wrap gap-3 items-center">
                    <input
                        type="text"
                        placeholder="Search by name/email..."
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="border px-3 py-1 rounded shadow-sm"
                    />

                    <label htmlFor="limit" className="text-sm font-medium">Show:</label>
                    <select
                        id="limit"
                        value={limit}
                        onChange={(e) => {
                            setPage(1);
                            setLimit(Number(e.target.value));
                        }}
                        className="border px-2 py-1 rounded"
                    >
                        {[5, 10, 20, 50].map((n) => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-auto">
                <table className="min-w-full bg-white rounded shadow text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left font-semibold text-gray-700">
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Source</th>
                            <th className="px-4 py-3">Token Change</th>
                            <th className="px-4 py-3">Plan</th>
                            <th className="px-4 py-3">Stripe ID</th>
                            <th className="px-4 py-3">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log: any) => (
                            <tr key={log._id} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <img
                                        src={log.user?.image || profile.src}
                                        alt={log.user?.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-3">{log.user?.name || "N/A"}</td>
                                <td className="px-4 py-3">{log.user?.email || "N/A"}</td>
                                <td className="px-4 py-3 capitalize">{log.source}</td>
                                <td className="px-4 py-3 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-700">+{log.tokenAdded}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        From {log.previousToken} → {log.newToken}
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-green-600 font-medium">
                                    {log.plan?.name || "N/A"}
                                </td>
                                <td className="px-4 py-3 text-xs text-gray-600">
                                    {log.stripeEventId || "N/A"}
                                </td>
                                <td className="px-4 py-3">
                                    {log.timestamp ? new Date(log.timestamp).toLocaleString() : "N/A"}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={() => {
                        if (page === 1) {
                            toast("Already on first page", { icon: "📄" });
                            return;
                        }
                        setPage((prev) => Math.max(prev - 1, 1));
                    }}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                    Previous
                </button>

                <p>
                    Page {page} of {meta?.totalPage || 1}
                </p>

                <button
                    onClick={() => {
                        if (meta && page >= meta.totalPage) {
                            toast("No more pages", { icon: "🔚" });
                            return;
                        }
                        setPage((prev) => prev + 1);
                    }}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TokenLogPage;
