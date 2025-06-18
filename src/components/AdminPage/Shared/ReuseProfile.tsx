import bgImage from "@/assets/images/profilebg.jpg";
import profile12 from "@/assets/images/profile12.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Wrapper from "@/components/wrapper/wrapper";

const ReuseProfile = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        fontFamily: "var(--font-roboto)",
      }}
      className="max-w-full mx-auto h-48 relative "
    >
      {/* BG IMAGE TO OVERLAY PROFILE SECTION */}

      <div className="space-y-5">
        <div className="space-y-[8px] pt-36 gap-9 ml-[40px]">
          <Avatar className="w-28 h-28 border-2 border-white">
            <AvatarImage src={profile12.src} alt="profile-photo" />
            <AvatarFallback>Alex</AvatarFallback>
          </Avatar>
          <div className=" flex flex-col md:flex-row gap-3.5">
            {/* Name And Email */}
            <div className="flex justify-start items-center">
              <div>
                <div className="flex items-center justify-between gap-1.5">
                  <h1 className="text-[20px] font-medium leading-[24px] text-black font-['Roboto']">
                    Jhonn Deos
                  </h1>

                  {/* Verify badge */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    className="w-[20px] h-[20px]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.298 1.05107C8.89785 0.52334 8.10449 0.52334 7.70433 1.05107L6.71161 2.3603C6.49327 2.64825 6.13657 2.796 5.77857 2.74678L4.15085 2.52298C3.49473 2.43277 2.93374 2.99375 3.02395 3.64987L3.24776 5.27759C3.29698 5.63559 3.14922 5.9923 2.86127 6.21064L1.55205 7.20336C1.02432 7.60351 1.02432 8.39687 1.55205 8.79702L2.86128 9.78975C3.14923 10.0081 3.29698 10.3648 3.24776 10.7228L3.02395 12.3505C2.93374 13.0066 3.49473 13.5676 4.15085 13.4774L5.77857 13.2536C6.13657 13.2044 6.49327 13.3521 6.71161 13.6401L7.70433 14.9493C8.10449 15.477 8.89785 15.477 9.298 14.9493L10.2907 13.6401C10.5091 13.3521 10.8658 13.2044 11.2238 13.2536L12.8515 13.4774C13.5076 13.5676 14.0686 13.0066 13.9784 12.3505L13.7546 10.7228C13.7054 10.3648 13.8531 10.0081 14.1411 9.78975L15.4503 8.79702C15.978 8.39687 15.978 7.60351 15.4503 7.20336L14.1411 6.21064C13.8531 5.9923 13.7054 5.63559 13.7546 5.27759L13.9784 3.64987C14.0686 2.99375 13.5076 2.43277 12.8515 2.52298L11.2238 2.74678C10.8658 2.796 10.5091 2.64825 10.2907 2.3603L9.298 1.05107ZM11.4209 6.52041C11.6161 6.32515 11.6161 6.00857 11.4209 5.8133C11.2256 5.61804 10.909 5.61804 10.7138 5.8133L7.76731 8.75975L6.6542 7.64664C6.45894 7.45138 6.14236 7.45138 5.94709 7.64664C5.75183 7.8419 5.75183 8.15848 5.94709 8.35374L7.41376 9.82041C7.50753 9.91418 7.63471 9.96686 7.76731 9.96686C7.89992 9.96686 8.0271 9.91418 8.12087 9.82041L11.4209 6.52041Z"
                      fill="#003366"
                    />
                  </svg>
                </div>
                <div className="space-y-2">
                  <p className="text-[15px] leading-5 font-normal">
                    @alex.jones
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part -2 */}
        <Wrapper>
          <div className="space-y-8">
            <div className="flex justify-between items-center ">
              <h2 className="overflow-hidden text-[#333] text-ellipsis font-roboto text-2xl font-semibold leading-[120%]">
                The Grand Hall
              </h2>

              <Button
                size="lg"
                className="bg-[var(--color-grayTwo)] hover:bg-[var(--color-grayTwo)] cursor-pointer px-[24px] py-[16px] flex items-center gap-[10px] mt-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-7 h-7"
                >
                  <mask
                    id="mask0_549_9774"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
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
                <span className="text-[16px] font-medium text-[var(--color-accent)]">
                  Messagee
                </span>
              </Button>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default ReuseProfile;
