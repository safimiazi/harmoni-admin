"use client";

import { useGetAllUserQuery } from "@/redux/features/user/adminApi";
import { useState } from "react";
import profile from "../../../assets/images/profile.png";
import { View } from "lucide-react";
import Link from "next/link";

const UserListTable = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVerified, setIsVerified] = useState("all");
  const [isDeleted, setIsDeleted] = useState("false");

  const { data, isLoading, error } = useGetAllUserQuery({
    page: Math.max(page - 1, 0), // backend-safe: never sends -1
    limit,
    searchTerm,
    isVerified: isVerified === "all" ? undefined : isVerified === "true",
    isDeleted: isDeleted === "all" ? undefined : isDeleted === "true",
  });

  const users = data?.data?.result || [];
  const meta = data?.data?.meta;

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users.</p>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <h2 className="text-xl font-bold">All Users</h2>

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search by name/email..."
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
            className="border px-3 py-1 rounded"
          />

          <select
            value={isVerified}
            onChange={(e) => {
              setPage(1);
              setIsVerified(e.target.value);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="all">All</option>
            <option value="true">Verified</option>
            <option value="false">Unverified</option>
          </select>

          <select
            value={isDeleted}
            onChange={(e) => {
              setPage(1);
              setIsDeleted(e.target.value);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="false">Active</option>
            <option value="true">Deactivated</option>
            <option value="all">All</option>
          </select>

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
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Token</th>
              <th className="px-4 py-3">Language</th>
              <th className="px-4 py-3">Theme</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Verified</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <img
                    src={user.image || profile.src}
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
                <td className="px-4 py-3 capitalize">
                  {user.provider || "Manual"}
                </td>
                <td className="px-4 py-3">
                  {user.isVerified ? (
                    <span className="text-green-600 font-medium">Yes</span>
                  ) : (
                    <span className="text-red-600 font-medium">No</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {user.isDeleted ? (
                    <span className="text-red-600 font-medium">No</span>

                  ) : (
                    <span className="text-green-600 font-medium">Yes</span>

                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <Link href={`/admin/user-management/${user._id}`}>
                  <button className="text-blue-600 hover:text-black cursor-pointer">
                    Details
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        <p>
          Page {page} of {meta?.totalPage || 1}
        </p>

        <button
          disabled={meta && page >= meta.totalPage}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserListTable;
