import ActiveUserManagement from "@/components/AdminPage/ActiveUserManagement/ActiveUserManagement";
import MapReuseComponent from "@/components/AdminPage/Shared/MapReuseComponent";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import InputStatusForm from "@/components/AdminPage/VenueManagement/InputStatusForm";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const ActiveUserDetails = () => {
  return (
    <div className="space-y-5">
      <ReuseProfile />
      <Wrapper>
        <ActiveUserManagement />
        <MapReuseComponent />
        <InputStatusForm />
      </Wrapper>
    </div>
  );
};

export default ActiveUserDetails;
