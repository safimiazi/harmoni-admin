
"use client"
import UserListTable from "@/components/AdminPage/UserManagement/UserListTable";
import CalculateUserCard from "@/components/reuseabelComponents/CalculateUserCard";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const userManagementPage = () => {
  return (
    <Wrapper>
      <div className="space-y-[28px]">
        <CalculateUserCard />
        <UserListTable/>
      </div>
    </Wrapper>
  );
};

export default userManagementPage;
