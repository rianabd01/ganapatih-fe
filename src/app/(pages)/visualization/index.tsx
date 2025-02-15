"use client";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import Select from "@/components/Select";
import Separator from "@/components/Separator";
import Title from "@/components/Title";
import { fetchTrips } from "./service";
import Visualization from "@/components/Visualization";
import {
  limitOptions,
  paymentTypeOptions,
  sortByOptions,
} from "@/utils/options";

export default function DataMap() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");

  const { data: trips = [] } = useQuery({
    queryKey: ["trips", { limit, page, sortBy, paymentType }],
    queryFn: fetchTrips,
  });

  return (
    <div className="flex-1 flex flex-col space-y-6">
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4">
            <Title type="h5">Data Filter</Title>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {/* Show Entries */}
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

              {/* Sort By */}
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

              {/* Payment Type */}
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

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-center space-x-3">
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
              <span className="text-sm font-medium text-gray-600">
                Page {page}
              </span>
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
      <div className="flex-1 space-y-3">
        <Title type="h5">Visualization Preview</Title>
        <Visualization trips={trips} />
      </div>
    </div>
  );
}
