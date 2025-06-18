import React from "react";

const CalculateCard = () => {
  const data = [
    {
      title: "Overall Revenue",
      amount: "$128,420",
      change: "+4.2%",
      unit: "in the last 30 days",
    },
    {
      title: "Total Registration",
      amount: "8,930 users",
      change: "+5.8%",
      unit: "new users this month",
    },
    {
      title: "Total Courses",
      amount: "152 courses",
      change: "+2.1%",
      unit: "added recently",
    },
    {
      title: "Average Review",
      amount: "4.5 / 5",
      change: "-0.2%",
      unit: "from user ratings",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {data.map((single) => (
        <div
          key={single.title}
          className="p-5 sm:p-7 bg-white rounded-2xl shadow-md flex flex-col justify-between"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-sm sm:text-base font-extrabold text-[var(--color-normalText)] font-Robot">
              {single.title}
            </h1>
            <button className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z"
                  fill="#003366"
                />
              </svg>
            </button>
          </div>

          {/* Bottom Row */}
          <div>
            <h2 className="text-xl sm:text-3xl font-semibold text-[var(--color-accent)] font-Robot tracking-[-0.68px]">
              {single.amount}
            </h2>
            <p className="text-sm text-[var(--color-textRed)] font-Robot">
              {single.change} {single.unit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalculateCard;
