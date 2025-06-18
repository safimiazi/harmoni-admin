import MapReuseComponent from "@/components/AdminPage/Shared/MapReuseComponent";
import ReuseProfile from "@/components/AdminPage/Shared/ReuseProfile";
import MoneyRefundForm from "@/components/AdminPage/VenueManagement/MoneyRefundForm";
import PaymentProfile from "@/components/AdminPage/VenueManagement/PaymentProfile";
import Wrapper from "@/components/wrapper/wrapper";

const MoneyRefund = () => {
  return (
    <div>
      <ReuseProfile />
      <Wrapper>
        <PaymentProfile />
        <MapReuseComponent />
        <MoneyRefundForm />
      </Wrapper>
    </div>
  );
};

export default MoneyRefund;
