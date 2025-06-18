import iconLocation from "@/assets/icon/location.png";
import iconStar from "@/assets/icon/star.png";
import iconMans from "@/assets/icon/mans.png";
import iconWifi from "@/assets/icon/wifi.png";

import Image from "next/image";
const PaymentProfile = () => {
  return (
    <div className="space-y-5 mt-55">
      <div className="flex flex-wrap justify-baseline items-center mt-2 space-x-7.5">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src={iconLocation} alt="" height={24} width={24} />
          <p className="text-base">New York, USA</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src={iconStar} alt="" height={24} width={24} />
          <p className="text-black text-base font-semibold leading-[120%] font-['Roboto']">
            5.0
          </p>
          <p className="text-[#ABB7C2] font-roboto text-base not-italic font-normal leading-[120%]">
            (345 reviews)
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src={iconMans} alt="" height={24} width={24} />
          <p>200 Guests</p>
        </div>
      </div>

      {/* Amenitics */}
      <div>
        <h2 className="text-[#333] font-Robot text-[20px] font-semibold leading-[120%] capitalize">
          Amenities
        </h2>
        <div className="flex justify-baseline items-center mt-4 mb-4 space-x-7.5">
          <div className="flex justify-end items-center gap-2 px-3 py-2 rounded-[34px] bg-[#FBF7EB] shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
            <Image src={iconWifi} alt="" height={16} width={16} />
            <p className="text-[#333] text-center font-roboto text-sm not-italic font-normal leading-[120%] capitalize">
              Wifi
            </p>
          </div>

          <div className="flex justify-end items-center gap-2 px-3 py-2 rounded-[34px] bg-[#FBF7EB] shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
            <Image src={iconWifi} alt="" height={16} width={16} />
            <p className="text-[#333] text-center font-roboto text-sm not-italic font-normal leading-[120%] capitalize">
              Parking
            </p>
          </div>

          <div className="flex justify-end items-center gap-2 px-3 py-2 rounded-[34px] bg-[#FBF7EB] shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
            <Image src={iconWifi} alt="" height={16} width={16} />
            <p className="text-[#333] text-center font-roboto text-sm not-italic font-normal leading-[120%] capitalize">
              AC
            </p>
          </div>
          <div className="flex justify-end items-center gap-2 px-3 py-2 rounded-[34px] bg-[#FBF7EB] shadow-[0_3px_10px_rgba(0,0,0,0.06)]">
            <Image src={iconWifi} alt="" height={16} width={16} />
            <p className="text-[#333] text-center font-roboto text-sm not-italic font-normal leading-[120%] capitalize">
              Pool
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentProfile;
