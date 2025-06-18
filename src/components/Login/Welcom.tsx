"use client";
import Image from "next/image";
import logo from "../../assets/icon/logo1.png";

const Welcome = () => {
  return (
    <div className="h-screen flex">
      <div className="relative w-full h-screen bg-[#0B0E60] overflow-hidden">
        {/* Decorative elements */}
        {/*  <div className="absolute top-[80px] right-[80px] w-[60px] h-[60px] rounded-full bg-purple-800"></div>
        <div className="absolute top-[150px] right-[40px] w-[30px] h-[30px] rotate-45 bg-purple-800"></div>
        <div className="absolute bottom-[80px] left-[40px] w-[100px] h-[100px] rounded-full bg-purple-800"></div>
        <div className="absolute bottom-[120px] right-[60px] w-[80px] h-[80px] rotate-45 bg-purple-800"></div>
        <div className="absolute right-[120px] bottom-[300px] w-0 h-0 border-l-[20px] border-l-transparent border-t-[30px] border-t-purple-800 border-r-[20px] border-r-transparent"></div> */}

        {/* Welcome Message + Logo */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center text-yellow-300">
          {/* Logo */}
          <Image
            src={logo}
            alt="Logo"
            width={80}
            height={80}
            className="mb-4"
          />

          <h1 className="text-4xl text-[#FEE57E] sm:text-5xl font-semibold font-Robot mb-2">
            Welcome, Admin!
          </h1>
          <p className="text-[16px] text-[#FDFCEE] text-center max-w-xs font-Montserrat tracking-widest leading-[20px]">
            Please log in with your admin info to access the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
