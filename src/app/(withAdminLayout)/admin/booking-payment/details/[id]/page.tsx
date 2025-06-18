import MapReuseComponent from "@/components/AdminPage/Shared/MapReuseComponent";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import InputForm from "@/components/AdminPage/VenueManagement/InputForm";
import PaymentProfile from "@/components/AdminPage/VenueManagement/PaymentProfile";
import Wrapper from "@/components/wrapper/wrapper";
import React from "react";

const BookingPaymentDetails = () => {
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

export default BookingPaymentDetails;
