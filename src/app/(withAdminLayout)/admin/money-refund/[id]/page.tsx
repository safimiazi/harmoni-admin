import MapReuseComponent from "@/components/AdminPage/Shared/MapReuseComponent";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import MoneyRefond from "@/components/AdminPage/VenueManagement/MoneyRefond";
import MoneyRefundForm from "@/components/AdminPage/VenueManagement/MoneyRefundForm";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const MoneyRefundConfirm = () => {
  return (
    <div>
      <ReuseProfile />
      <Wrapper>
        <div className="space-y-[28px]">
          <MoneyRefond />
          <MapReuseComponent />
          <MoneyRefundForm />
        </div>
      </Wrapper>
    </div>
  );
};

export default MoneyRefundConfirm;
