import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MoneyRefundForm = () => {
  return (
    <div>
      {/* Showing  Form Data */}
      <div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-[395px]">
            <Label
              htmlFor="event"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Event Name
            </Label>

            <Input
              className="mb-4 bg-white"
              type="text"
              id="event"
              placeholder="John's Birthday"
            />
          </div>
          <div className="flex-1 min-w-[395px] mb-4">
            <Label
              htmlFor="organizer"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Organizer
            </Label>
            <Input
              className="bg-white"
              type="text"
              id="organizer"
              placeholder="John Deo"
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-[395px]">
            <Label
              htmlFor="event"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Date
            </Label>

            <Input
              className="mb-4 bg-white"
              type="text"
              id="event"
              placeholder="15/03/2025"
            />
          </div>
          <div className="flex-1 min-w-[395px] mb-4">
            <Label
              htmlFor="organizer"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Time
            </Label>
            <Input
              className="bg-white"
              type="text"
              id="time"
              placeholder="John Deo"
            />
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-[395px]">
            <Label
              htmlFor="event"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Event Type
            </Label>

            <Input
              className="mb-4 bg-white"
              type="text"
              id="event"
              placeholder="Birthday"
            />
          </div>
          <div className="flex-1 min-w-[395px] mb-4">
            <Label
              htmlFor="organizer"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate"
            >
              Guest
            </Label>
            <Input
              className="bg-white"
              type="number"
              id="guest"
              placeholder="100"
            />
          </div>
        </div>
      </div>

      {/* Payment Details And Decoration */}
      <div className="mt-5 space-y-5">
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-[395px] h-[267px] p-3 rounded-sm shadow-md bg-white">
            <div className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate">
              Payment Details
            </div>
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <p className="text-[var(--color-normalText)]">Total Cost</p>
                  <p className="text-[var(--color-accent)] font-semibold">
                    $ 80000
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="text-[var(--color-normalText)]">Paid</p>
                  <p className="text-[var(--color-accent)] font-semibold">
                    $ 1500
                  </p>
                </div>
              </div>
              <div className="mt-[100px]">
                <hr />
                <div className="flex justify-between items-center ">
                  <p className="text-[var(--color-normalText)]">Due</p>
                  <p className="text-[var(--color-accent)] font-semibold">
                    $ 65000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <div>
            <Button className="bg-[var(--color-secondary)] text-white hover:opacity-90 w-32 h-9">
              Confirm Refund
            </Button>
          </div>

          <div>
            <Button
              className="bg-white text-[var(--color-secondary)] hover:opacity-90 w-26 h-9"
              variant="outline"
            >
              Declined
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyRefundForm;
/* 
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRefundMoneyMutation } from "@/features/refund/refundApi";

const MoneyRefundForm = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    organizer: "",
    date: "",
    time: "",
    eventType: "",
    guest: 0,
    amount: 6500, // example
  });

  const [refundMoney, { isLoading, isSuccess, isError }] =
    useRefundMoneyMutation();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id === "guest" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await refundMoney(formData).unwrap();
      alert("Refund successful!");
      console.log(res);
    } catch (err) {
      console.error("Refund failed:", err);
      alert("Refund failed");
    }
  };

  return (
    <div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="eventName">Event Name</Label>
          <Input
            id="eventName"
            onChange={handleChange}
            placeholder="John's Birthday"
          />
        </div>
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            onChange={handleChange}
            placeholder="John Deo"
          />
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="date">Date</Label>
          <Input id="date" onChange={handleChange} placeholder="15/03/2025" />
        </div>
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="time">Time</Label>
          <Input id="time" onChange={handleChange} placeholder="10:00 AM" />
        </div>
      </div>

      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="eventType">Event Type</Label>
          <Input
            id="eventType"
            onChange={handleChange}
            placeholder="Birthday"
          />
        </div>
        <div className="flex-1 min-w-[395px]">
          <Label htmlFor="guest">Guest</Label>
          <Input
            id="guest"
            onChange={handleChange}
            type="number"
            placeholder="100"
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-[var(--color-secondary)] text-white hover:opacity-90 w-32 h-9"
        >
          {isLoading ? "Processing..." : "Confirm Refund"}
        </Button>
      </div>

      {isSuccess && <p className="text-green-600 mt-2">Refund Successful</p>}
      {isError && <p className="text-red-600 mt-2">Refund Failed</p>}
    </div>
  );
};

export default MoneyRefundForm;

 */
