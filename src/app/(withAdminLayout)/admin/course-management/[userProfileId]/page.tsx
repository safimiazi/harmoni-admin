"use client";
import React from "react";
import bgImage from "@/assets/images/profilebg.jpg";
import profile from "@/assets/images/profile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import { MapPin } from "lucide-react";
// import Venue from "@/components/Dashboard/Venue";
import Status from "@/components/Dashboard/Status";
import Form from "@/components/Dashboard/Form";
import Service from "@/components/Dashboard/Service";

const UserProfile = () => {
  
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        fontFamily: "var(--font-roboto)",
      }}
      className="max-w-full mx-auto h-48 relative"
    >
      <Wrapper>

        {/* BG IMAGE TO OVERLAY PROFILE SECTION */}
        <div className="space-y-[8px] pt-32 sm:pt-28 gap-6 sm:gap-9 text-[var(--font-roboto)]">

          <Avatar className="w-28 h-28 border-2 border-white">
            <AvatarImage src={profile.src} alt="profile-photo" />
            <AvatarFallback>Alex Jones</AvatarFallback>
          </Avatar>

          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-sm sm:text-[16px] font-semibold">Alex Jones</h1>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  className="inline-block"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.29605 1.05107C8.89589 0.52334 8.10254 0.52334 7.70238 1.05107L6.70966 2.3603C6.49132 2.64825 6.13461 2.796 5.77661 2.74678L4.14889 2.52298C3.49278 2.43277 2.93179 2.99375 3.022 3.64987L3.2458 5.27759C3.29502 5.63559 3.14727 5.9923 2.85932 6.21064L1.5501 7.20336C1.02236 7.60351 1.02236 8.39687 1.5501 8.79702L2.85932 9.78975C3.14727 10.0081 3.29502 10.3648 3.2458 10.7228L3.022 12.3505C2.93179 13.0066 3.49278 13.5676 4.14889 13.4774L5.77661 13.2536C6.13461 13.2044 6.49132 13.3521 6.70966 13.6401L7.70238 14.9493C8.10254 15.477 8.89589 15.477 9.29605 14.9493L10.2888 13.6401C10.5071 13.3521 10.8638 13.2044 11.2218 13.2536L12.8495 13.4774C13.5057 13.5676 14.0666 13.0066 13.9764 12.3505L13.7526 10.7228C13.7034 10.3648 13.8512 10.0081 14.1391 9.78975L15.4483 8.79702C15.9761 8.39687 15.9761 7.60351 15.4483 7.20336L14.1391 6.21064C13.8512 5.9923 13.7034 5.63559 13.7526 5.27759L13.9764 3.64987C14.0666 2.99375 13.5057 2.43277 12.8495 2.52298L11.2218 2.74678C10.8638 2.796 10.5071 2.64825 10.2888 2.3603L9.29605 1.05107ZM11.4189 6.52041C11.6142 6.32515 11.6142 6.00857 11.4189 5.8133C11.2237 5.61804 10.9071 5.61804 10.7118 5.8133L7.76536 8.75975L6.65225 7.64664C6.45698 7.45138 6.1404 7.45138 5.94514 7.64664C5.74988 7.8419 5.74988 8.15848 5.94514 8.35374L7.41181 9.82041C7.50558 9.91418 7.63275 9.96686 7.76536 9.96686C7.89797 9.96686 8.02515 9.91418 8.11891 9.82041L11.4189 6.52041Z"
                    fill="#003366"
                  />
                </svg>
              </div>{" "}
              <div className="space-y-1">
                <p>@alex.jones</p>
                <p>Photographer</p>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5" />
                  <p>New York</p>
                </div>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center space-x-0.5 py-2 px-4 bg-[#DCE1E6] cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <mask
                      id="mask0_549_9774"
                      style={{ maskType: "alpha" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      className="w-6 h-5 text-white"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_549_9774)">
                      <path
                        d="M6 18L3.7 20.3C3.38333 20.6167 3.02083 20.6875 2.6125 20.5125C2.20417 20.3375 2 20.025 2 19.575V4C2 3.45 2.19583 2.97917 2.5875 2.5875C2.97917 2.19583 3.45 2 4 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H6ZM5.15 16H20V4H4V17.125L5.15 16ZM7 14H13C13.2833 14 13.5208 13.9042 13.7125 13.7125C13.9042 13.5208 14 13.2833 14 13C14 12.7167 13.9042 12.4792 13.7125 12.2875C13.5208 12.0958 13.2833 12 13 12H7C6.71667 12 6.47917 12.0958 6.2875 12.2875C6.09583 12.4792 6 12.7167 6 13C6 13.2833 6.09583 13.5208 6.2875 13.7125C6.47917 13.9042 6.71667 14 7 14ZM7 11H17C17.2833 11 17.5208 10.9042 17.7125 10.7125C17.9042 10.5208 18 10.2833 18 10C18 9.71667 17.9042 9.47917 17.7125 9.2875C17.5208 9.09583 17.2833 9 17 9H7C6.71667 9 6.47917 9.09583 6.2875 9.2875C6.09583 9.47917 6 9.71667 6 10C6 10.2833 6.09583 10.5208 6.2875 10.7125C6.47917 10.9042 6.71667 11 7 11ZM7 8H17C17.2833 8 17.5208 7.90417 17.7125 7.7125C17.9042 7.52083 18 7.28333 18 7C18 6.71667 17.9042 6.47917 17.7125 6.2875C17.5208 6.09583 17.2833 6 17 6H7C6.71667 6 6.47917 6.09583 6.2875 6.2875C6.09583 6.47917 6 6.71667 6 7C6 7.28333 6.09583 7.52083 6.2875 7.7125C6.47917 7.90417 6.71667 8 7 8Z"
                        fill="#003366"
                      />
                    </g>
                  </svg>

                  <span>Message</span>
                </Button>
              </div>
            </div>
            {/* DYNAMIC COMPONENTS SHOWING */}
            {/* <Venue /> */}
            <Service />
          </div>

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-[var(--color-grayOne)] my-8" />

          {/*  STATUS SECTION */}
          <Status />

          {/* DIVIDER */}
          <div className="w-full h-[1px] bg-[var(--color-grayOne)] my-8" />

          {/* FORM */}
          <Form />
        </div>
      </Wrapper>
    </div>
  );
};

export default UserProfile;
