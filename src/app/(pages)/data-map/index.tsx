"use client";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { TaxiTrip } from "@/types/trips";
import Select from "@/components/Select";
import formatDate from "@/utils/format-date";
import NumberFormatEN from "@/utils/format-num";
import { fetchTrips } from "./service";
import Separator from "@/components/Separator";
import Title from "@/components/Title";
import {
  limitOptions,
  paymentTypeOptions,
  sortByOptions,
} from "@/utils/options";

const DynamicMap = dynamic(() => import("@/components/Map"), { ssr: false });
export default function DataMap() {
  const [selectedTrip, setSelectedTrip] = useState<TaxiTrip | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");

  const {
    data: trips = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trips", { limit, page, sortBy, paymentType }],
    queryFn: fetchTrips,
  });

  const columns: ColumnDef<TaxiTrip>[] = [
    {
      accessorKey: "pickup_datetime",
      header: "Pickup Time",
      enableSorting: true,
      cell: ({ row }) => (
        <div className="text-center">
          {formatDate(row.original.pickup_datetime)}
        </div>
      ),
    },
    {
      accessorKey: "fare_amount",
      header: "Fare ($)",
      enableSorting: true,
      cell: ({ row }) => NumberFormatEN(row.original.fare_amount),
    },
    {
      accessorKey: "trip_distance",
      header: "Distance (miles)",
      enableSorting: true,

      cell: ({ row }) => NumberFormatEN(row.original.trip_distance),
    },
    {
      accessorKey: "payment_type",
      header: "Payment Type",
      enableSorting: true,
    },
  ];

  const table = useReactTable({
    data: trips,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4">
            <Title type="h5">Data Filter</Title>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="limit"
                  className="text-sm font-medium text-gray-700"
                >
                  Show:
                </label>
                <Select
                  id="limit"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  options={limitOptions}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="sort"
                  className="text-sm font-medium text-gray-700"
                >
                  Sort By:
                </label>
                <Select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  initialValue="No filter"
                  options={sortByOptions}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="paymentTypeFilter"
                  className="text-sm font-medium text-gray-700"
                >
                  Payment Type:
                </label>
                <Select
                  id="paymentTypeFilter"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  initialValue="No filter"
                  options={paymentTypeOptions}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 border rounded-lg overflow-hidden">
              {isLoading && (
                <div className="animate-pulse w-full overflow-hidden">
                  <div className="bg-gray-50 border-b border-gray-200">
                    <div className="grid grid-cols-6 gap-4 px-6 py-3">
                      {[...Array(6)].map((_, index) => (
                        <div
                          key={`header-${index}`}
                          className="h-4 bg-gray-200 rounded"
                        />
                      ))}
                    </div>
                  </div>

                  {[...Array(5)].map((_, rowIndex) => (
                    <div
                      key={`row-${rowIndex}`}
                      className="border-b border-gray-200"
                    >
                      <div className="grid grid-cols-6 gap-4 px-6 py-4">
                        {[...Array(6)].map((_, colIndex) => (
                          <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className="h-4 bg-gray-100 rounded"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {isError && (
                <div className="p-8">
                  <p className="text-center text-red-500">
                    Failed to load data
                  </p>
                </div>
              )}

              {!isLoading && !isError && (
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                              onClick={header.column.getToggleSortingHandler()}
                            >
                              <div className="flex items-center space-x-1">
                                {flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                                <span>
                                  {{ asc: " ↑", desc: " ↓" }[
                                    header.column.getIsSorted() as string
                                  ] ?? null}
                                </span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {table.getRowModel().rows.map((row) => (
                        <tr
                          key={row.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedTrip(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex items-center justify-center space-x-2">
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
              <span className="text-sm text-gray-600">Page {page}</span>
              <button
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setPage((prev) => prev + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Separator />
      </div>
      <div className="flex-1 space-y-3 min-h-[600px] max-h-96">
        <Title type="h5">Map Preview</Title>
        <DynamicMap selectedTrip={selectedTrip} />
      </div>
    </div>
  );
}
