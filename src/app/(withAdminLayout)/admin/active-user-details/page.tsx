import ActiveUserManagement from "@/components/AdminPage/ActiveUserManagement/ActiveUserManagement";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import InputStatusForm from "@/components/AdminPage/UserManagement/InputStatusForm";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const ActiveUserDetails = () => {
  return (
    <div className="space-y-5">
      <ReuseProfile />
      <Wrapper>
        <ActiveUserManagement />
        <InputStatusForm />
      </Wrapper>
    </div>
  );
};

export default ActiveUserDetails;
