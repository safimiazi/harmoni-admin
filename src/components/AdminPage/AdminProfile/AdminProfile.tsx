"use client";

import { useRef, useState, useEffect } from "react";
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
import {
  useGetMeQuery,
  useUpdateProfileImageMutation,
  useUpdateUserDataMutation,
} from "@/redux/features/user/adminApi";

const AdminProfile: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [updateProfileImage] = useUpdateProfileImageMutation();
  const [updateUserData] = useUpdateUserDataMutation();
  const { data: user, isLoading, error, refetch } = useGetMeQuery({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    photo: "/default.png",
    role: "",
    phoneNumber: "",
  });

  const [formData, setFormData] = useState(adminData);

  useEffect(() => {
    if (user?.data) {
      const updated = {
        name: user.data.name || "",
        email: user.data.email || "",
        photo:
          typeof user.data.image === "string"
            ? user.data.image
            : user.data.image?.url || "/default.png",
        role: user.data.role || "",
        phoneNumber: user.data.phoneNumber || "",
      };
      setAdminData(updated);
      setFormData(updated);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const form = new FormData();
    form.append("file", file);

    try {
      const result = await updateProfileImage(form).unwrap();
      const newImage = result.data.image;
      setAdminData((prev) => ({ ...prev, photo: newImage }));
      await refetch(); // refresh user data after image update
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await updateUserData({
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phoneNumber: formData.phoneNumber,
      }).unwrap();

      setAdminData(formData);
      setIsDialogOpen(false);
      await refetch();
    } catch (err) {
      console.error("Failed to update user data:", err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Failed to load profile.</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="flex flex-col items-center space-y-4">
        <div
          className="relative w-24 h-24 cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={adminData.photo || "/default.png"}
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">
            {adminData.name}
          </h2>
          <p className="text-sm text-gray-600">{adminData.email}</p>
          <p className="text-sm text-gray-500">Role: {adminData.role}</p>
          <p className="text-sm text-gray-500">Phone: {adminData.phoneNumber}</p>
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
              {["name", "email", "role", "phone"].map((field) => (
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
              ))}
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
