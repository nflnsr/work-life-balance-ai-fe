"use client";

import { useAuthStore } from "@/stores/auth";
import { useSidebar } from "./sidebar";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import profileImage from "@/assets/avatar-profile.avif";

export function DashboardHeader() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useSidebar();
  return (
    <header
      className={`z-10 w-full h-[calc(var(--header-height))] border-b bg-white shadow-sm ${
        !user?.field && "blur-xs"
      }`}
    >
      <div className="z-10 flex items-center justify-between px-4 py-3.5">
        <button
          className="lg:hidden"
          onClick={() => {
            toggleSidebar();
          }}
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="relative rounded-full p-1 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            <div className="flex items-center">
              <Image
                className="h-8 w-8 rounded-full"
                src={profileImage}
                alt="User avatar"
                width={32}
                height={32}
              />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
          {/* <div className="hidden md:block max-w-[600px] max-h-12 text-sm leading-4 overflow-y-auto">
                  {dataQuotes?.[0]?.quote} -{" "}
                  <span className="font-semibold">{dataQuotes?.[0]?.author}</span>
              </div> */}
        </div>
      </div>
    </header>
  );
}
