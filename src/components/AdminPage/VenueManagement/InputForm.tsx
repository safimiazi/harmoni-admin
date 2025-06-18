import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const InputForm = () => {
  const _id = "12345";
  return (
    <div>
      {/* Showing  Form Data */}
      <div>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex-1 min-w-[395px]">
            <Label
              htmlFor="event"
              className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font- truncate"
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
                    $ 8000
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
                    $ 6500
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-[395px] h-[267px] p-3 rounded-sm shadow-md bg-white">
            <div className="mb-2 text-[20px] font-normal leading-6 text-[var(--color-textPrimary)] font-['Roboto'] truncate">
              Decoration
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Table Shape</p>
                <p className="text-[var(--color-accent)]">Round</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Flower Color</p>
                <p className="text-[var(--color-accent)]">Red</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Seating Style</p>
                <p className="text-[var(--color-accent)]">Banquet</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Fragrance</p>
                <p className="text-[var(--color-accent)]">Sweet</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Light Styles</p>
                <p className="text-[var(--color-accent)]">Warm Yellow</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">
                  Tablecloth Colors
                </p>
                <p className="text-[var(--color-accent)]">White</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[var(--color-normalText)]">Stage Decor</p>
                <p className="text-[var(--color-accent)]">LED Backdrops</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Link href={`/admin/money-refund/${_id}`}>
            <Button className="bg-[var(--color-secondary)] text-white hover:opacity-90 h-[36px] w-[91px] cursor-pointer">
              Pay Refund
            </Button>
          </Link>

          <div>
            <Button
              variant="outline"
              className="text-yellow-500 border border-yellow-500 h-[36px] w-[91px] cursor-pointer"
            >
              Declined
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputForm;
