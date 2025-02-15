"use client";
import { Suspense, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Menu, X } from "lucide-react";
import sideBar from "@/components/Sidebar";
import Separator from "@/components/Separator";

const queryClient = new QueryClient();

export default function Home() {
  const [activeContent, setActiveContent] = useState<string>("map-visual");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const SidebarContent = () => (
    <>
      <div className="flex flex-row justify-end">
        <button
          className="p-2 rounded-md hover:bg-gray-200 mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <h1
        className={`text-lg font-semibold mb-4 ${!isSidebarOpen && "hidden"}`}
      >
        Menu
      </h1>
      {sideBar.map(({ id, title }, index) => (
        <div key={id}>
          {index > 0 && <Separator />}
          <button
            className={`w-full text-left p-2 rounded ${
              activeContent === id ? "bg-gray-300" : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveContent(id);
              if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
              }
            }}
          >
            {isSidebarOpen ? title : title.charAt(0)}
          </button>
        </div>
      ))}
    </>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full">
        <div className="h-screen flex">
          <div
            className={`${
              isSidebarOpen ? "w-64" : "w-16"
            } bg-gray-100 text-black p-4 z-[99999] overflow-y-auto transition-all duration-300 hidden md:block`}
          >
            <SidebarContent />
          </div>

          <div className="md:hidden fixed top-0 left-0 w-full p-4 bg-white shadow-md flex justify-between items-center z-50">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          {isSidebarOpen && (
            <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[99998]">
              <div className="bg-gray-100 h-full w-64 p-4 overflow-y-auto">
                <SidebarContent />
              </div>
            </div>
          )}

          <div className="flex-1 flex flex-col p-6 overflow-y-auto mt-14 md:mt-0">
            <Suspense fallback={<div>Loading...</div>}>
              {sideBar.find((item) => item.id === activeContent)?.content}
            </Suspense>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
