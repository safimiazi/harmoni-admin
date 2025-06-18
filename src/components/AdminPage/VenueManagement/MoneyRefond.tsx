import iconLocation from "@/assets/icon/location.png";
import iconStar from "@/assets/icon/star.png";
import camera from "@/assets/icon/camera.png";

import Image from "next/image";
const MoneyRefond = () => {
  return (
    <div className="space-y-5 mt-55">
      <div className="flex flex-wrap justify-baseline items-center mt-2 space-x-7.5">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Image src={camera} alt="" height={24} width={24} />
          <p className="text-base">Professional Photographer</p>
        </div>
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
            (345 reviewss)
          </p>
        </div>
      </div>
    </div>
  );
};

export default MoneyRefond;
