"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const AdminProfile: React.FC = () => {
  const [adminData, setAdminData] = useState({
    name: "Michael Johnson",
    email: "michael.johnson@adminusa.com",
    photo: "https://i.pravatar.cc/150?img=3",
    role: "Administrator",
    phone: "(555) 123-4567",
    address: "123 Main St, Los Angeles, CA 90001, USA",
  });

  const [formData, setFormData] = useState(adminData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setAdminData(formData);
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <Image
          src={adminData.photo}
          alt="Admin"
          width={100}
          height={100}
          className="rounded-full object-cover"
        />
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {adminData.name}
          </h2>
          <p className="text-sm text-gray-600">{adminData.email}</p>
          <p className="text-sm text-gray-500">Role: {adminData.role}</p>
          <p className="text-sm text-gray-500">Phone: {adminData.phone}</p>
          <p className="text-sm text-gray-500">Address: {adminData.address}</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(true)}
              className="text-[#003366] border-[#003366] cursor-pointer"
            >
              Edit Profile
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] bg-white rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#1D1B28]">
                Update Profile
              </DialogTitle>
              <DialogDescription>Edit your profile details.</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {["name", "email", "photo", "role", "phone", "address"].map(
                (field) => (
                  <div
                    key={field}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <label htmlFor={field} className="text-right capitalize">
                      {field}
                    </label>
                    <Input
                      id={field}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                )
              )}
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="text-[#003366] border-[#003366]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdate}
                className="bg-[#003366] text-white hover:bg-[#0a3b6d]/90"
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminProfile;
