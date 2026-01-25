"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Calendar,
  Compass,
  Home,
  Menu,
  MonitorCheck,
  TestTube,
  User,
  UserCog,
  X,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import profileImage from "@/assets/avatar-profile.avif";

export default function Dashboard() {
  const { user, setIsLoading } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const router = useRouter();
  
  const { data: dataFeedback } = useQuery({
    queryKey: ["feedback"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/user/feedback");
      return response.data;
    },
  });

  const { mutate: mutateFeedback, isPending: isPendingFeedback } = useMutation({
    mutationKey: ["feedback"],
    mutationFn: async (feedback: string) => {
      const response = await axiosPrivate.post("/user/feedback", {
        feedback,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      toast.success("Feedback submitted successfully");
    },
  });

  const { mutate: mutateLogout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axiosPrivate.post("/user/logout");
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

  useEffect(() => {
    if (!user?.hasAnsweredQuestionnaire) {
      router.replace("/dashboard");
    }
  }, [user?.hasAnsweredQuestionnaire, router]);

  return (
    <div className="min-h-[100svh] max-w-screen bg-gray-50 lg:flex lg:flex-row">
      <div
        className={`fixed inset-0 z-50 bg-black/50 ${sidebarOpen ? "block" : "hidden"} lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 top-0 left-0 z-50 h-[100svh] w-64 transform bg-white shadow-lg transition-transform duration-500 ease-in-out lg:sticky lg:w-64 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
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

      <div className="h-screen min-h-screen w-full lg:h-auto">
        <header
          className={`z-10 h-[calc(var(--header-height))] border-b bg-white shadow-sm ${
            !user?.field && "blur-xs"
          }`}
        >
          <div className="z-10 flex items-center justify-between px-4 py-3.5">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>
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
          </div>
        </header>

        <main className="flex w-full max-w-[950px] flex-col p-6 pb-12">
          <h1 className="mb-4 text-2xl font-semibold text-gray-900">
            Feedback
          </h1>
          <p className="text-gray-700">
            You&apos;re welcome to give any comments, critiques, requests,
            experiences, or anything you want to share.
          </p>
          <Textarea
            id="fill-feedback"
            defaultValue={dataFeedback?.data}
            className="mt-4 h-32 w-full border bg-white shadow-lg disabled:cursor-auto"
            placeholder="type here..."
            disabled={isPendingFeedback || dataFeedback?.data}
          />
          <Button
            onClick={() => {
              const feedbackInput = (
                document.getElementById("fill-feedback") as HTMLTextAreaElement
              )?.value;
              mutateFeedback(feedbackInput);
            }}
            disabled={isPendingFeedback || dataFeedback?.data}
            className="mt-4 cursor-pointer self-end bg-teal-600 text-white hover:bg-teal-700"
          >
            {isPendingFeedback
              ? "loading..."
              : dataFeedback?.data
                ? "Feedback Submitted ✔"
                : "Submit Feedback"}
          </Button>
        </main>
      </div>
    </div>
  );
}
