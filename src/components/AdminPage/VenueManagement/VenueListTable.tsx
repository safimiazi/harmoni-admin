"use client";

import React from "react";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import venuphoto1 from "@/assets/images/venuphoto1.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetAllVenuesQuery } from "@/redux/features/venue/venueApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import { setFilterStatus } from "@/redux/features/venue/venueSlice";
import { Venue } from "@/redux/types/venue.type";

// Status filter dropdown component
const StatusHeader: React.FC<{
  setStatusFilter: (status: string | null) => void;
  currentStatus: string | null;
}> = ({ setStatusFilter, currentStatus }) => {
  const [open, setOpen] = React.useState(false);
  const statusOptions = ["All", "Active", "Hold", "Suspend"];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-sm text-gray-800 hover:text-black"
      >
        <span>
          {currentStatus
            ? statusOptions.find(
                (opt) => opt.toUpperCase() === currentStatus
              ) || "Status"
            : "Status"}
        </span>
        <IoChevronDown />
      </button>
      {open && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow z-10">
          {statusOptions.map((option) => (
            <div
              key={option}
              onClick={() => {
                setStatusFilter(option === "All" ? null : option.toUpperCase());
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer capitalize"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const statusMap = {
  ACTIVE: { text: "Active", color: "bg-green-500" },
  HOLD: { text: "Hold", color: "bg-yellow-500" },
  SUSPEND: { text: "Suspend", color: "bg-red-500" },
};

// Define column structure
const getColumns = (
  setStatusFilter: (status: string | null) => void,
  currentStatus: string | null
): ColumnDef<Venue>[] => [
  {
    accessorKey: "name",
    header: () => <span className="font-semibold ">Venue Name</span>,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const imageSrc = row.original.coverImage || venuphoto1.src;

      return (
        <div className="flex items-center gap-3">
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="rounded w-[40px] h-[40px] object-cover"
          />
          <span className="font-semibold">{name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => (
      <StatusHeader
        setStatusFilter={setStatusFilter}
        currentStatus={currentStatus}
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusMap;
      const { text, color } = statusMap[status] || {
        text: "Unknown",
        color: "bg-gray-400",
      };
      return (
        <div className="flex items-center gap-2">
          <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
          <span className="capitalize cursor-pointer">{text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <span className="font-semibold">Address</span>,
    cell: ({ row }) => <span>{row.getValue("address") || "N/A"}</span>,
  },
  {
    accessorKey: "totalEarning",
    header: () => <div className="text-right font-semibold">Total Earning</div>,
    cell: ({ row }) => {
      const val = Number(row.getValue("totalEarning")) || 0;
      return <div className="text-right font-medium">${val.toFixed(2)}</div>;
    },
  },
  {
    accessorKey: "commission",
    header: () => <div className="text-right font-semibold">Commission</div>,
    cell: ({ row }) => {
      const val = Number(row.getValue("commission")) || 0;
      return <div className="text-right font-medium">${val.toFixed(2)}</div>;
    },
  },
  {
    id: "details",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <a
          href={`/admin/venue-management/${row.original.id}`}
          className="text-blue-600 underline text-sm"
        >
          Details
        </a>
      </div>
    ),
  },
];
console.log(
  "Venue Data:",
  getColumns((status) => console.log("Set status:", status), "ACTIVE")
);

export function VenueListTable() {
  const dispatch = useAppDispatch();
  const filterStatus = useAppSelector((state) => state.venue.filterStatus);

  const { data, isLoading, isError } = useGetAllVenuesQuery(
    filterStatus ? { status: filterStatus } : {}
  );

  const venueList: Venue[] = React.useMemo(() => data || [], [data]);

  const table = useReactTable({
    data: venueList,
    columns: getColumns(
      (status) => dispatch(setFilterStatus(status)),
      filterStatus
    ),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return (
      <div className="text-center p-4 text-red-500">Error loading data</div>
    );

  return (
    <div className="p-4 bg-white rounded shadow">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500">
                No venues found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

/* 
"use client";

import venuphoto1 from "@/assets/images/venuphoto1.png";
import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { IoChevronDown } from "react-icons/io5";

export type Venue = {
  id: string;
  venueName: string;
  status: "active" | "hold" | "suspend";
  address: string;
  totalEarning: number;
  commission: number;
  photo: string;
  coverImage?: string; // Added coverImage property
};

const data: Venue[] = [
  {
    id: "v001",
    venueName: "The Grand Hall",
    status: "active",
    address: "123 Main St, NY",
    totalEarning: 1200,
    commission: 200,
    photo: venuphoto1.src,
  },
  {
    id: "v002",
    venueName: "Ocean View Hall",
    status: "hold",
    address: "456 Ocean Dr, CA",
    totalEarning: 950,
    commission: 150,
    photo: venuphoto1.src,
  },
  {
    id: "v003",
    venueName: "Garden Plaza",
    status: "suspend",
    address: "789 Garden Rd, TX",
    totalEarning: 0,
    commission: 0,
    photo: venuphoto1.src,
  },
  {
    id: "v004",
    venueName: "Skyline Event Center",
    status: "active",
    address: "101 Sky Blvd, LA",
    totalEarning: 5000,
    commission: 800,
    photo: venuphoto1.src,
  },
  {
    id: "v005",
    venueName: "City Lights Ballroom",
    status: "active",
    address: "202 City Ave, NY",
    totalEarning: 3500,
    commission: 500,
    photo: venuphoto1.src,
  },
  {
    id: "v006",
    venueName: "Riverfront Conference Hall",
    status: "hold",
    address: "303 River Rd, FL",
    totalEarning: 1300,
    commission: 250,
    photo: venuphoto1.src,
  },
  {
    id: "v007",
    venueName: "Mountain Retreat",
    status: "active",
    address: "404 Hilltop Ln, CO",
    totalEarning: 2100,
    commission: 350,
    photo: venuphoto1.src,
  },
  {
    id: "v008",
    venueName: "Sunset Pavilion",
    status: "suspend",
    address: "505 Sunset Blvd, NV",
    totalEarning: 0,
    commission: 0,
    photo: venuphoto1.src,
  },
  {
    id: "v009",
    venueName: "The Royal Palace",
    status: "active",
    address: "606 Palace Rd, MA",
    totalEarning: 8500,
    commission: 1200,
    photo: venuphoto1.src,
  },
];

const StatusHeader: React.FC<{
  setStatusFilter: (status: string | null) => void;
}> = ({ setStatusFilter }) => {
  const [open, setOpen] = React.useState(false);
  const statusOptions = ["All", "Active", "Hold", "Suspend"];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 font-medium text-sm text-gray-800 hover:text-black focus:outline-none"
      >
        <span>Status</span>
        <IoChevronDown className="text-gray-500" />
      </button>

      {open && (
        <div className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1 text-sm text-gray-700">
            {statusOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setStatusFilter(
                    option === "All" ? null : option.toLowerCase()
                  );
                  setOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const getColumns = (
  setStatusFilter: (status: string | null) => void
): ColumnDef<Venue>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="cursor-pointer"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "venueName",
    header: "Venue Name",
    cell: ({ row }) => {
      const venueName = row.getValue("venueName") as string;
      const venuePhotoUrl = row.original.photo;
      return (
        <div className="flex items-center space-x-3 ">
          <Image
            src={venuePhotoUrl}
            alt={venueName}
            className="w-10 h-10 object-cover rounded "
            width={40}
            height={40}
          />
          <span className="font-medium ">{venueName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <StatusHeader setStatusFilter={setStatusFilter} />,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusMap: Record<string, { text: string; color: string }> = {
        active: { text: "Active", color: "bg-green-500" },
        hold: { text: "Hold", color: "bg-yellow-500" },
        suspend: { text: "Suspend", color: "bg-red-500" },
      };
      const { text, color } = statusMap[status] || {
        text: "Unknown",
        color: "bg-gray-500",
      };
      return (
        <div className="flex items-center gap-2 cursor-pointer">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} />
          <span className="capitalize text-sm font-medium">{text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => <div>{row.getValue("address")}</div>,
  },
  {
    accessorKey: "totalEarning",
    header: () => <div className="text-right">Total Earning</div>,
    cell: ({ row }) => {
      const amount = row.getValue("totalEarning") as number;
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "commission",
    header: () => <div className="text-right">Commission</div>,
    cell: ({ row }) => {
      const amount = row.getValue("commission") as number;
      return (
        <div className="text-right font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
  },
  {
    id: "details",
    cell: ({ row }) => (
      <ul>
        <div className="flex justify-end">
          <a
            href={`/admin/venue-management/${row.original.id}`}
            className="text-[var(--color-accent)] underline cursor-pointer w-[44px] h-[16px] font-roboto font-medium text-[14px] leading-[14px] flex items-center justify-end"
          >
            Details
          </a>
        </div>
      </ul>
    ),
  },
];

export function VenueListTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);

  const filteredData = React.useMemo(() => {
    if (!statusFilter) return data;
    return data.filter((venue) => venue.status === statusFilter);
  }, [statusFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: getColumns(setStatusFilter),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between py-4">
        <h3 className="text-lg ml-4 font-semibold text-roboto text-[14px] leading-[100%] tracking-[0px] align-middle">
          All Venue List
        </h3>
      </div>

      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
 */
