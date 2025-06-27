"use client";

import Wrapper from "@/components/wrapper/wrapper";
import { useGetSingleUserQuery,  useToggleUserDeleteMutation} from "@/redux/features/user/adminApi";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserDetailsPage = () => {
  const params = useParams();
  const userId = params?.id as string;

  const { data: user, isLoading, error, refetch } = useGetSingleUserQuery(userId);
console.log("user", !user?.data.isDeleted)
  // mutations
  const [toggleUserDelete, { isLoading: isDeleting }] = useToggleUserDeleteMutation();


  // Local editable state
  const [editableUser, setEditableUser] = useState<any>(null);

 

  useEffect(() => {
    if (user?.data) setEditableUser(user.data);
  }, [user]);

  if (isLoading) return <div className="p-5 text-center">Loading...</div>;
  if (error) return <div className="p-5 text-center text-red-600">Failed to load user</div>;
  if (!editableUser) return null;

  // Handle user field change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditableUser((prev: any) => ({ ...prev, [name]: value }));
  };

  // Handle address field change
  const handleAddressChange = (idx: number, field: string, value: string) => {
    const newAddresses = [...editableUser.addresses];
    newAddresses[idx][field] = value;
    setEditableUser((prev: any) => ({ ...prev, addresses: newAddresses }));
  };



const handleToggleDeleteUser = async () => {
  const newStatus = !user?.data?.isDeleted;

  if (!confirm(`Are you sure to ${newStatus ? "deactivate" : "activate"} this user?`)) return;

  try {
    await toggleUserDelete({ userId, deleted: newStatus }).unwrap();
    toast.success(`User has been ${newStatus ? "deactivated" : "activated"} successfully.`);
    refetch();
  } catch {
    toast.error("Failed to toggle user status.");
  }
};

  return (
    <Wrapper>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-indigo-600">User Details</h1>

        <div className="flex items-center gap-6 mb-6">
          <img
            src={editableUser.image}
            alt={editableUser.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500"
          />
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              value={editableUser.name}
              onChange={handleChange}
              className="text-2xl font-semibold border-b-2 border-indigo-400 focus:outline-none focus:border-indigo-600"
            />
            <p className="text-gray-600">{editableUser.email}</p>
            <p className={`font-semibold ${editableUser.isDeleted ? "text-red-600" : "text-green-600"}`}>
              {editableUser.isDeleted ? "Deactivated" : "Active"}
            </p>
          </div>
        </div>

        {/* User Basic Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-medium">Age</label>
            <input
              type="number"
              name="age"
              value={editableUser.age || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              value={editableUser.gender || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={editableUser.phoneNumber || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Region</label>
            <input
              type="text"
              name="region"
              value={editableUser.region || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* Addresses */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-indigo-600 flex justify-between items-center">
            Addresses
        
          </h2>
          {editableUser.addresses?.map((addr: any, idx: number) => (
            <div key={addr._id || idx} className="mb-4 p-4 border rounded-md bg-indigo-50 relative">
              <input
                type="text"
                name={`label-${idx}`}
                value={addr.label}
                onChange={(e) => handleAddressChange(idx, "label", e.target.value)}
                placeholder="Label (Home, Work, etc.)"
                className="font-semibold mb-1 w-full border-b border-indigo-400 focus:outline-none focus:border-indigo-600"
              />
              <input
                type="text"
                name={`addressLine1-${idx}`}
                value={addr.addressLine1}
                onChange={(e) => handleAddressChange(idx, "addressLine1", e.target.value)}
                placeholder="Address Line 1"
                className="mb-1 w-full border border-gray-300 rounded px-2 py-1"
              />
              <input
                type="text"
                name={`addressLine2-${idx}`}
                value={addr.addressLine2 || ""}
                onChange={(e) => handleAddressChange(idx, "addressLine2", e.target.value)}
                placeholder="Address Line 2"
                className="mb-1 w-full border border-gray-300 rounded px-2 py-1"
              />
              <div className="grid grid-cols-3 gap-2 mt-1">
                <input
                  type="text"
                  name={`city-${idx}`}
                  value={addr.city}
                  onChange={(e) => handleAddressChange(idx, "city", e.target.value)}
                  placeholder="City"
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name={`state-${idx}`}
                  value={addr.state}
                  onChange={(e) => handleAddressChange(idx, "state", e.target.value)}
                  placeholder="State"
                  className="border border-gray-300 rounded px-2 py-1"
                />
                <input
                  type="text"
                  name={`postalCode-${idx}`}
                  value={addr.postalCode}
                  onChange={(e) => handleAddressChange(idx, "postalCode", e.target.value)}
                  placeholder="Postal Code"
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <input
                type="text"
                name={`country-${idx}`}
                value={addr.country}
                onChange={(e) => handleAddressChange(idx, "country", e.target.value)}
                placeholder="Country"
                className="mt-1 w-full border border-gray-300 rounded px-2 py-1"
              />
{/* 
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleSaveAddress(addr)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Save Address
                </button>
                {addr._id && (
                  <button
                    onClick={() => handleDeleteAddress(addr._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete Address
                  </button>
                )}
              </div> */}
            </div>
          ))}
        </div>

        {/* Save User & Toggle Delete Buttons */}
        <div className="flex gap-6">
          {/* <button
            onClick={handleSaveUser}
            disabled={isUpdating}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
          >
            {isUpdating ? "Saving..." : "Save User Info"}
          </button> */}
          <button
            onClick={handleToggleDeleteUser}
            disabled={isDeleting}
            className={`px-6 py-3 rounded text-white ${
              editableUser.isDeleted ? "bg-green-700 hover:bg-green-800" : "bg-red-600 hover:bg-red-700"
            } disabled:opacity-60`}
          >
            {isDeleting
              ? "Processing..."
              : editableUser.isDeleted
              ? "Activate User"
              : "Deactivate User"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserDetailsPage;
