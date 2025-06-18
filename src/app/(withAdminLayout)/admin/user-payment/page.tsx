"use client";

import InputForm from "@/components/AdminPage/VenueManagement/InputForm";
import MapReuseComponent from "@/components/AdminPage/Shared/MapReuseComponent";
import PaymentProfile from "@/components/AdminPage/VenueManagement/PaymentProfile";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import Wrapper from "@/components/wrapper/wrapper";

const UserPayment = () => {
  return (
    <div>
      <ReuseProfile />
      <Wrapper>
        <PaymentProfile />
        <MapReuseComponent />
        <InputForm />
      </Wrapper>
    </div>
  );
};

export default UserPayment;
