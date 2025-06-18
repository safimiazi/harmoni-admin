import { VenueListTable } from "@/components/AdminPage/VenueManagement/VenueListTable";
import CalculateCard from "@/components/reuseabelComponents/calculateCard";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const venueManagementPage = () => {
  return (
    <Wrapper>
      <div className="space-y-[28px]">
        <CalculateCard />
        <VenueListTable />
      </div>
    </Wrapper>
  );
};

export default venueManagementPage;
