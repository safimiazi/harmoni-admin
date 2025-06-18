"use client";
import * as React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { BiSolidChevronDownSquare } from "react-icons/bi";
import Wrapper from "@/components/wrapper/wrapper";

export type Venue = {
  id: string;
  venueName: string;
  address: string;
  photo: string;
};

const data: Venue[] = [
  {
    id: "v001",
    venueName: "New Booking: Venue A",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v002",
    venueName: "Venue Approval: Venue B",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v003",
    venueName: "Booking Confirmation: Venue C",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v004",
    venueName: "Final Payment: Venue D",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v005",
    venueName: "Event Setup: Venue E",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v006",
    venueName: "Guest Check-In: Venue F",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
  {
    id: "v007",
    venueName: "Event Wrap-Up: Venue G",
    address: "25 March 2025",
    photo:
      "https://discoverholidaysbd.com/wp-content/uploads/2019/06/the-big-clock.jpg",
  },
];

export function RecentActivityTable() {
  return (
    <Wrapper>
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-start py-4 w-full h-[24px] text-[#D4AF37]">
          <h3 className="font-medium text-sm leading-5 tracking-tight font-plus-jakarta-sans">
            Recent Activity
          </h3>
          <BiSolidChevronDownSquare className="w-5 h-4 ml-2 cursor-pointer" />
        </div>

        <div className="rounded-md">
          <Table>
            <TableBody>
              {data.length ? (
                data.map((venue) => (
                  <TableRow key={venue.id}>
                    <TableCell className="">
                      <div className="flex items-center">
                        <Image
                          src={venue.photo}
                          width={40}
                          height={40}
                          alt={venue.venueName}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div className="font-medium">{venue.venueName}</div>
                      </div>
                    </TableCell>
                    <TableCell className="flex justify-end">
                      {venue.address}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Wrapper>
  );
}
