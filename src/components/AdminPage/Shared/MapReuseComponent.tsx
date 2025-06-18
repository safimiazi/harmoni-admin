"use client";

import { useState } from "react";

const offices = [
  {
    name: "Germany Office",
    lat: 52.52,
    lng: 13.405,
  },
  {
    name: "UK Office",
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    name: "USA Office",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    name: "Saudi Arabia's Office",
    lat: 24.7136,
    lng: 46.6753,
  },
  {
    name: "AUS Office",
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    name: "South Africa Office",
    lat: -33.9249,
    lng: 18.4241,
  },
];

const MapReuseComponent = () => {
  const [activeOffice] = useState(offices[2]);

  return (
    <div className="w-full ">
      <h2 className="text-[20px] font-Robot font-semibold text-start text-[#0C121D] mb-4 mt-4 ">
        Map
      </h2>
      <div className="mapouter relative w-full h-[389px] mb-6">
        <div className="gmap_canvas w-full h-full rounded-[12px]  ">
          <iframe
            title="Google Map"
            className="gmap_iframe w-full h-full "
            src={`https://maps.google.com/maps?width=600&height=400&hl=en&q=${activeOffice.lat},${activeOffice.lng}&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
          ></iframe>
        </div>
        <style>
          {`
            .mapouter {
              position: relative;
              width: 100%;
              height: 400px;
            }
            .gmap_canvas {
              overflow: hidden;
              background: none !important;
              width: 100%;
              height: 400px;
            }
            .gmap_iframe {
              width: 100% !important;
              height: 400px !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default MapReuseComponent;
