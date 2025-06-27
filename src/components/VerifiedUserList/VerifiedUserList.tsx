"use client";

import { useGetAllVerifiedUserQuery } from "@/redux/features/user/userApi";
import { useState } from "react";
import profile from "../../assets/images/profile.png";

const VerifiedUserList = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, error } = useGetAllVerifiedUserQuery({ page, limit });

  const users = data?.data?.result || [];
  const meta = data?.data?.meta;

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users.</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Verified Users</h2>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm font-medium">
            Show per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setPage(0);
              setLimit(Number(e.target.value));
            }}
            className="border px-2 py-1 rounded"
          >
            {[2, 5, 10, 20].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Theme</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border-t text-sm">
                <td className="px-4 py-3">
                  <img
                    src={user.image ||   profile.src}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3">{user.token}</td>
                <td className="px-4 py-3">{user.language}</td>
                <td className="px-4 py-3">{user.theme}</td>
                <td className="px-4 py-3 capitalize">{user.provider || "Manual"}</td>
                <td className="px-4 py-3">
                  {user.isVerified ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center pt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {meta?.page || 1} of {meta?.totalPage || 1}
        </p>
        <button
          disabled={meta && meta.page >= meta.totalPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VerifiedUserList;
