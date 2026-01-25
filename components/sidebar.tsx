"use client";

import { useAuthStore } from "@/stores/auth";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
  useMemo,
} from "react";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Compass,
  Home,
  MonitorCheck,
  TestTube,
  User,
  UserCog,
  X,
} from "lucide-react";

type SidebarContextProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}
const SidebarContext = createContext<SidebarContextProps | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = useCallback(() => setIsOpen(true), [setIsOpen]);
  const closeSidebar = useCallback(() => setIsOpen(false), [setIsOpen]);
  const toggleSidebar = useCallback(
    () => setIsOpen((prev) => !prev),
    [setIsOpen],
  );

  const contextValue = useMemo<SidebarContextProps>(
    () => ({
      isOpen,
      setIsOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
    }),
    [isOpen, setIsOpen, openSidebar, closeSidebar, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const { user, setIsLoading } = useAuthStore();
  const axiosPrivate = useAxiosPrivate();
  const { isOpen, closeSidebar } = useSidebar();

  const { mutate: mutateLogout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axiosPrivate.post("/api/user/logout");
      return response.data;
    },
    onSuccess: () => {
      useAuthStore.getState().clearAuthStore();
      toast.success("Logout successful");
    },
  });

  useEffect(() => {
    setIsLoading?.(true);
    if (user?.field) {
      setIsLoading?.(false);
    }
  }, [user?.field, setIsLoading]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 ${isOpen ? "block" : "hidden"} lg:hidden`}
        onClick={() => closeSidebar()}
      />

      <div
        className={`fixed inset-y-0 top-0 left-0 z-50 h-[100svh] w-[250px] transform bg-white shadow-lg transition-transform duration-500 ease-in-out lg:sticky lg:w-[250px] lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${!user?.hasAnsweredQuestionnaire && "pointer-events-auto select-auto"}`}
      >
        <div
          className={`absolute top-18 flex h-[calc(100%-var(--header-height))] w-full bg-white/40 ${!user?.hasAnsweredQuestionnaire ? "backdrop-blur-[2px]" : "-z-10"}`}
        />
        <div className="flex h-[calc(var(--header-height))] items-center justify-between border-b p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-amber-600" />
            <span className="text-xl font-bold">
              <span className="text-amber-600">Work</span>-
              <span className="text-teal-600">Life</span>
            </span>
          </div>
          <button className="lg:hidden" onClick={() => closeSidebar()}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="">
          <div className="space-y-1 px-4 pt-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md bg-teal-50 px-3 py-2 text-sm font-medium text-teal-700"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/sample"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <TestTube className="h-5 w-5" />
              Sample Account
            </Link>
            <Link
              href="/dashboard/feedback"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5" />
              Feedback
            </Link>
          </div>
          <div className="mt-8 px-4">
            <h3 className="px-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Settings
            </h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center rounded-md bg-green-50">
                <Link
                  href="#"
                  className="flex cursor-default items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <span className="ml-2 text-xs font-semibold text-green-400 italic">
                  Soon
                </span>
              </div>
              <div className="flex items-center rounded-md bg-green-50">
                <Link
                  href="#"
                  className="flex cursor-default items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  <MonitorCheck className="h-5 w-5" />
                  Display
                </Link>
                <span className="ml-2 text-xs font-semibold text-green-400 italic">
                  Soon
                </span>
              </div>
              <div className="flex items-center rounded-md bg-green-50">
                <Link
                  href="#"
                  className="flex cursor-default items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  <UserCog className="h-5 w-5" />
                  Account
                </Link>
                <span className="ml-2 text-xs font-semibold text-green-400 italic">
                  Soon
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 z-5 w-full px-4">
            <Button
              disabled={isLoadingLogout}
              onClick={() => mutateLogout()}
              className="w-full cursor-pointer bg-red-500/85 text-white hover:bg-red-400/90"
            >
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
