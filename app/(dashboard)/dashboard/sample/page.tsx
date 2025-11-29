"use client";

import React from "react";

import PreRegister from "../_components/pre-register";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BadgeInfo,
  Bell,
  Calendar,
  Check,
  Compass,
  Home,
  Menu,
  Plus,
  SendHorizonal,
  Settings,
  ShieldHalf,
  Siren,
  TestTube,
  TrainFrontTunnel,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { IRecommendation, IWlb } from "@/types/api/wlb";
import { CircularProgress } from "@/components/ui/circular-progress";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ISchedule } from "@/types/api/schedule";
import { INote } from "@/types/api/note";
import { IChat } from "@/types/api/chat";

export default function Dashboard() {
  const { user, setIsLoading } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDialogAlertChatAI, setShowDialogAlertChatAI] = useState(false);
  const [openAddNotes, setOpenAddNotes] = useState(false);

  const dataWlbLatest = {
    score: 76,
    dimensionalScores: [
      { id: 1, dimension: "Akademik/Pekerjaan ", score: 85, analysis: "" },
      { id: 2, dimension: "Pengembangan Diri", score: 72, analysis: "" },
      { id: 3, dimension: "Sosial & Relasi", score: 76, analysis: "" },
      { id: 4, dimension: "Personal & Mental", score: 75, analysis: "" },
      { id: 5, dimension: "Karier & Masa Depan", score: 74, analysis: "" },
    ],
    recommendations: [
      {
        id: 1,
        title: "Pahami Akar Ketidakpuasan Kerja",
        description:
          "Luangkan waktu untuk merenungkan dan memperhatikan faktor-faktor spesifik yang menyebabkan ketidakpuasan Anda di tempat kerja. Hindari hal-hal yang dapat menurunkan semangat dan produktivitas Anda.",
        priority: "High",
        checked: false,
      },
      {
        id: 2,
        title: "Buat Peta Jalan Karier Jangka Panjang",
        description:
          "Setelah mengatasi kecemasan jangka pendek, mulailah memetakan tujuan karier Anda untuk 1-3 tahun ke depan. Ini akan memberikan Anda arah yang jelas dan motivasi untuk terus maju.",
        priority: "Medium",
        checked: false,
      },
      {
        id: 3,
        title: "Perkuat Hubungan Rekan Kerja",
        description:
          "Ambil inisiatif untuk berinteraksi lebih sering dengan rekan kerja, baik melalui diskusi profesional maupun kegiatan santai. Jaringan dukungan yang kuat dapat meningkatkan produktivitas Anda.",
        priority: "Low",
        checked: true,
      },
    ],
  } as IWlb;

  const dataSchedule = [
    {
      id: 1,
      desc: "Meeting",
      time: new Date("2025-11-27T02:40:00.000Z"),
      category: "WORK_ACTIVITY",
      looping: "WEEKDAYS",
    },
    {
      id: 2,
      desc: "Watch anime",
      time: new Date("2025-11-27T05:30:00.000Z"),
      category: "PERSONAL_TIME",
      looping: "EVERYDAY",
    },
    {
      id: 3,
      desc: "Learn English",
      time: new Date("2025-11-27T12:40:00.000Z"),
      category: "SELF_DEVELOPMENT",
      looping: "WEEKDAYS",
    },
    {
      id: 4,
      desc: "coding before sleep",
      time: new Date("2025-11-27T13:50:00.000Z"),
      category: "SELF_DEVELOPMENT",
      looping: "WEEKDAYS",
    },
    {
      id: 5,
      desc: "push rank",
      time: new Date("2025-11-27T13:50:00.000Z"),
      category: "PERSONAL_TIME",
      looping: "WEEKENDS",
    },
    {
      id: 6,
      desc: "kumpul komunitas wibu",
      time: new Date("2025-11-27T16:59:00.000Z"),
      category: "PERSONAL_TIME",
    },
  ] as ISchedule[];

  const dataNotes = [
    {
      id: 1,
      date: new Date(),
      items: [
        {
          id: 1,
          content:
            "Besok ke cilegon bawa baju 3, celana panjang 2 pendek 2, sneaker, sepatu casual, sarung",
        },
        { id: 2, content: "jan lupa service motor sekalian ganti oli" },
      ],
    },
    {
      id: 2,
      date: new Date("2025-11-24T16:59:00.000Z"),
      items: [
        { id: 1, content: "besok jangan bawa bekel mau makan-makan" },
        { id: 2, content: "cuci motor dulu sebelum berangkat" },
      ],
    },
    {
      id: 3,
      date: new Date("2025-11-22T16:59:00.000Z"),
      items: [{ id: 1, content: "capenya meeting hari ini..." }],
    },
  ] as INote[];

  const dataChat = [
    {
      id: 1,
      message: "How can I improve my work-life balance?",
      answer:
        "You can improve your work-life balance by setting clear boundaries between work and personal time, prioritizing self-care, and scheduling regular breaks throughout the day.",
    },
    {
      id: 2,
      message: "What are some effective stress management techniques?",
      answer:
        "Effective stress management techniques include mindfulness meditation, regular physical exercise, deep breathing exercises, and maintaining a healthy social support network.",
    },
    {
      id: 3,
      message: "How do I set realistic goals for personal development?",
      answer:
        "To set realistic goals for personal development, use the SMART criteria: make your goals Specific, Measurable, Achievable, Relevant, and Time-bound. Break larger goals into smaller, manageable steps and track your progress regularly.",
    },
  ] as IChat[];

  const dataWlbHistory = [
    { date: "2025-11-04", score: 65 },
    { date: "2025-11-05", score: 70 },
    { date: "2025-11-06", score: 72 },
    { date: "2025-11-07", score: 78 },
    { date: "2025-11-08", score: 84 },
  ];

  const chartData = [
    { date: "2025-11-04", score: 65, month: "D1" },
    { date: "2025-11-05", score: 70, month: "D2" },
    { date: "2025-11-06", score: 72, month: "D3" },
    { date: "2025-11-07", score: 78, month: "D4" },
    { date: "2025-11-08", score: 84, month: "D5" },
    { date: "2025-11-09", month: "D6" },
    { date: "2025-11-10", month: "D7" },
  ];

  const axiosPrivate = useAxiosPrivate();

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

  const currentTime = new Date().toTimeString().slice(0, 5);

  const chartConfig = {
    score: {
      label: "score",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    setIsLoading?.(true);
    if (user?.field) {
      setIsLoading?.(false);
    }
  }, [user?.field, setIsLoading]);

  return (
    <div className="min-h-[100svh] max-w-screen bg-gray-50 lg:flex lg:flex-row">
      {/* Mobile sidebar */}
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
              href="#"
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
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
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

      {/* Main content */}
      <div className="h-screen min-h-screen w-full lg:h-auto">
        {/* Top navigation */}
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
                  src="/images/avatar-profile.avif"
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

        {/* Dashboard content */}
        {user?.hasAnsweredQuestionnaire ? (
          <main className="p-6 pb-12">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor and improve your work-life balance
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 md:h-[600px] md:flex-row">
              <div className="flex w-full flex-col justify-between gap-5">
                {/* Balance Score */}
                <Card className="h-full gap-3">
                  <CardHeader>
                    <CardTitle>Work-Life Balance Score</CardTitle>
                    <CardDescription>
                      Your current balance score based on activity tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="relative h-40 w-40">
                        <CircularProgress value={dataWlbLatest.score} />
                      </div>
                      <div className="w-full max-w-96 flex-1 space-y-4">
                        <div className="space-y-1.5 md:pr-8">
                          {dataWlbLatest?.dimensionalScores.map((item) => {
                            return (
                              <React.Fragment key={item.id}>
                                <div
                                  key={item.id}
                                  className="flex w-full items-center justify-between gap-2"
                                >
                                  <h4 className="text-sm font-medium">
                                    {item.dimension}
                                  </h4>
                                  <p
                                    className={`text-sm ${item.score >= 75 ? "text-green-600" : item.score >= 50 ? "text-amber-500" : "text-red-600"}`}
                                  >
                                    {item.score}
                                  </p>
                                </div>
                                <div>
                                  <Progress
                                    value={item.score}
                                    className="h-2 w-full bg-gray-200 fill-amber-200"
                                  />
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="h-[400px] gap-0 overflow-y-auto sm:h-full">
                  <CardHeader className="pb-4">
                    <CardTitle>Balance Advisor</CardTitle>
                    <CardDescription>
                      AI-powered suggestions to improve your balance
                    </CardDescription>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <span className="block size-2 rounded-full bg-red-500" />
                        <p className="text-xs">High</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="block size-2 rounded-full bg-amber-500" />
                        <p className="text-xs">Medium</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="block size-2 rounded-full bg-teal-500" />
                        <p className="text-xs">Low</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="">
                    <ul className="space-y-4">
                      {dataWlbLatest?.recommendations.map(
                        (item: IRecommendation) => (
                          <li key={item.id} className="flex gap-4">
                            <div
                              className={`hidden h-10 w-10 flex-shrink-0 items-center justify-center self-center rounded-full sm:flex ${
                                item.priority === "High"
                                  ? "bg-red-100"
                                  : item.priority === "Medium"
                                    ? "bg-amber-100"
                                    : "bg-teal-100"
                              }`}
                            >
                              {item.priority === "High" ? (
                                <Siren className="h-5 w-5 text-red-600" />
                              ) : item.priority === "Medium" ? (
                                <TriangleAlert className="h-5 w-5 text-amber-600" />
                              ) : (
                                <ShieldHalf className="h-5 w-5 text-teal-600" />
                              )}
                            </div>

                            <div className="self-center">
                              <h4 className="text-sm font-medium">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {item.description}
                              </p>
                            </div>

                            <div className="self-start">
                              <Button
                                size="sm"
                                variant="outline"
                                aria-disabled={item.checked}
                                tabIndex={item.checked ? -1 : 0}
                                className={`${
                                  item.checked
                                    ? "cursor-default border-green-600 bg-green-50 hover:bg-green-100"
                                    : "cursor-pointer"
                                }`}
                              >
                                <Check
                                  className={`size-4 ${item.checked ? "text-green-600" : ""}`}
                                />
                              </Button>
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
                {/* Today's Schedule */}
                <Card className="scroll-box h-[400px] w-full gap-0 overflow-y-auto md:h-auto">
                  <CardHeader className="flex w-full flex-row justify-between space-y-0 pb-5">
                    <div className="">
                      <CardTitle>Today&apos;s Schedule</CardTitle>
                      {/* <CardDescription className="pt-0.5 text-[14px]">
                        Thursday, May 7, 2025
                      </CardDescription> */}
                      <div className="flex gap-2 pt-1.5">
                        <div className="flex items-center gap-2">
                          <span className="block size-2 rounded-full bg-amber-500" />
                          <p className="text-xs">work</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="block size-2 rounded-full bg-teal-500" />
                          <p className="text-xs">personal</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="block size-2 rounded-full bg-blue-500" />
                          <p className="text-xs">self-dev</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button className="h-7 bg-stone-200/70 hover:bg-stone-300 has-[>svg]:px-1.5">
                        <Plus className="h-4 w-4 text-black" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <>
                        {dataSchedule?.length === 0 && (
                          <div className="mx-auto w-full pb-2">
                            <p className="text-center text-[14px] text-gray-500">
                              There is no schedule for today.
                            </p>
                            {/* <p className="text-center text-[14px] text-gray-500">
                            Create one now!
                          </p> */}
                            <div className="pt-2">
                              <Button
                                className="mx-auto block bg-stone-300/75 text-center text-black hover:bg-stone-200"
                              >
                                Create Now!
                              </Button>
                            </div>
                          </div>
                        )}
                        {dataSchedule?.map((item, index: number) => {
                          const isPast =
                            currentTime >
                            new Date(item.time).toTimeString().slice(0, 5);
                          return (
                            <div
                              key={index}
                              className="relative border-l border-gray-200 pb-4 pl-6"
                            >
                              <div
                                className={`absolute top-0 left-0 h-4 w-4 -translate-x-1/2 rounded-full ${item.category === "PERSONAL_TIME" ? "bg-teal-500" : item.category === "WORK_ACTIVITY" ? "bg-amber-500" : "bg-blue-400"}`}
                              ></div>
                              <time className="text-xs text-gray-500">
                                {new Date(item.time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </time>
                              <h4
                                className={`text-sm font-medium ${isPast ? "text-gray-500 line-through decoration-[1.5px]" : "text-black"}`}
                              >
                                {item.desc}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {item.category
                                  .replaceAll("_", " ")
                                  .toLowerCase()
                                  .replace(/\b\w/g, (c: string) =>
                                    c.toUpperCase(),
                                  )}{" "}
                                {item.looping
                                  ? `• ${item.looping.charAt(0).toUpperCase() + item.looping.slice(1).toLowerCase()}`
                                  : ""}
                              </p>
                            </div>
                          );
                        })}
                        <div className="inline-block bg-gray-100 px-2 py-1">
                          <div className="relative">
                            <BadgeInfo className="absolute top-0 left-0 size-4" />
                            <p className="text-justify indent-4.5 font-sans text-[0.65rem]">
                              For a real account, the schedule will only show if
                              the selected looping matches the current time.
                            </p>
                          </div>
                        </div>
                      </>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Great Notes */}
                <Card className="scroll-box h-[400px] w-full gap-0 overflow-y-auto md:h-auto">
                  <CardHeader className="flex w-full flex-row justify-between space-y-0 pb-4">
                    <div className="">
                      <CardTitle>Your Great Notes</CardTitle>
                      <CardDescription className="pt-0.5 text-[14px]">
                        {/* todays date */}
                        {new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <div>
                      <Button
                        className={`h-7 bg-stone-200/70 hover:bg-stone-300 has-[>svg]:px-1.5`}
                      >
                        <Plus className="h-4 w-4 text-black" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-0">
                    <div className="relative">
                      {openAddNotes && (
                        <>
                          <Textarea
                            name="addNotes"
                            id="addNotes"
                            className="mt-1 h-24 w-full px-2 pt-1 pb-8 text-sm ring-1 ring-gray-400 outline-none focus:ring-gray-800"
                            placeholder="enter your notes..."
                          />
                          <Button
                            onClick={() => {
                              setOpenAddNotes(false);
                            }}
                            className="absolute right-3 bottom-1 bg-teal-500 text-white hover:bg-teal-600"
                          >
                            Save
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="space-y-3">
                      {dataNotes?.[0]?.date &&
                      new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }) !==
                        new Date(dataNotes?.[0]?.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        ) ? (
                        <>
                          {!openAddNotes && (
                            <div className="mx-auto w-full pb-2">
                              <p className="text-center text-[14px] text-gray-500">
                                There&apos;s no note for today.
                              </p>
                              <p className="text-center text-[14px] text-gray-500">
                                Create one now!
                              </p>
                              <div className="pt-2">
                                <Button
                                  onClick={() => setOpenAddNotes(true)}
                                  className="mx-auto block bg-stone-300/75 text-center text-black hover:bg-stone-200"
                                >
                                  Add Note
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {dataNotes?.[0]?.items.map((item) => (
                            <li
                              key={item.id}
                              className="ml-2.5 text-sm text-gray-500"
                            >
                              {item.content}
                            </li>
                          ))}
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardHeader className="pt-4 pb-3">
                    <CardTitle>Your Notes Record</CardTitle>
                    {/* <CardDescription>Thursday, May 7, 2025</CardDescription> */}
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {dataNotes?.length === 0 ? (
                      <div>
                        <p> There are no notes available.</p>
                      </div>
                    ) : (
                      <>
                        {dataNotes?.[0]?.date &&
                        new Date().toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }) !==
                          new Date(dataNotes?.[0]?.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )
                          ? dataNotes?.map((note) => (
                              <div key={note.id} className="space-y-2">
                                <p className="text-[14px] text-gray-500">
                                  {new Date(note.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )}
                                </p>
                                {note.items.map((item) => (
                                  <li
                                    key={item.id}
                                    className="text-sm text-gray-500"
                                  >
                                    {item.content}
                                  </li>
                                ))}
                              </div>
                            ))
                          : dataNotes?.slice(1).map((note) => (
                              <div key={note.id} className="space-y-2">
                                <p className="text-[14px] text-gray-500">
                                  {new Date(note.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    },
                                  )}
                                </p>
                                {note.items.map((item) => (
                                  <li
                                    key={item.id}
                                    className="text-sm text-gray-500"
                                  >
                                    {item.content}
                                  </li>
                                ))}
                              </div>
                            ))}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="mb-8 pt-8">
              <Tabs defaultValue="activity">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Daily Overview</h2>
                  <TabsList>
                    <TabsTrigger value="activity">Summary</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="activity">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
                    {[
                      "Day 1",
                      "Day 2",
                      "Day 3",
                      "Day 4",
                      "Day 5",
                      "Day 6",
                      "Day 7",
                    ].map((day, index) => (
                      <Card
                        key={day}
                        className={`gap-0 py-1 ${index === 4 && "border-teal-500"} `}
                      >
                        <CardHeader className="px-4 py-2 pb-2">
                          <CardTitle className="text-sm font-medium">
                            {day}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex justify-center space-y-2">
                            <CircularProgress
                              value={dataWlbHistory?.[index]?.score ?? 0}
                              className="md:size-full"
                              circularResponsive
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="trends" className="">
                  <Card className="gap-2">
                    <CardHeader>
                      <CardTitle>Area Chart</CardTitle>
                      <CardDescription>
                        Showing total visitors for the last 6 months
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-40 w-full">
                      <ChartContainer
                        config={chartConfig}
                        className="h-40 w-full"
                      >
                        <LineChart
                          accessibilityLayer
                          data={chartData}
                          margin={{
                            left: 12,
                            right: 12,
                          }}
                          className="h-40 text-green-500"
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 5)}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                          />
                          <Line
                            dataKey="score"
                            type="linear"
                            stroke="var(--color-score)"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                    <CardFooter>
                      <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                          <p>• D = Day</p>
                          <div className="flex items-center gap-2 leading-none font-medium text-gray-600">
                            {user?.createdAt
                              ? (() => {
                                  const start = new Date(user.createdAt);
                                  const end = new Date(user.createdAt);
                                  end.setDate(end.getDate() + 6);

                                  const format = (date: Date) => {
                                    const weekday = date.toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday: "short",
                                      },
                                    );
                                    const day = date
                                      .getDate()
                                      .toString()
                                      .padStart(2, "0");
                                    const month = date.toLocaleString("en-US", {
                                      month: "short",
                                    });
                                    const year = date.getFullYear();
                                    return `${weekday}, ${day} ${month} ${year}`;
                                  };

                                  return `${format(start)} - ${format(end)}`;
                                })()
                              : "N/A"}
                            <TrendingUp className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="">
              <div className="w-full rounded-t-md border border-b-0 bg-white px-4 py-1.5 font-bold shadow sm:w-fit">
                <p>
                  <span className="text-amber-500">Ask me anything, </span>
                  <span className="text-teal-500">
                    I&apos;m here to help 😁
                  </span>
                </p>
              </div>

              <div className="rounded-tr-md border bg-white px-3 pt-1 pb-2">
                <Label
                  htmlFor="message"
                  className="block pt-1 pb-0.5 text-xs font-medium text-gray-700 sm:text-sm"
                >
                  You can ask me for 8 times a day! what a service 😎
                </Label>
                <Label>
                  quota left: <span className="font-bold text-teal-600">8</span>
                </Label>
              </div>

              <div className="max-h-[550px] overflow-y-auto rounded-b-md border bg-white sm:max-h-[600px]">
                <div>
                  <div className="relative space-y-2 px-2 pt-4 sm:px-4">
                    {/* {(isLoadingChatAI || isPendingChatAI) && (
                      <div className="absolute top-1/2 left-1/2 z-10 flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/40">
                        <span className="block size-20 animate-spin rounded-full border-t-2 border-b-2 border-stone-600" />
                      </div>
                    )} */}
                    {dataChat?.map((chatItem, index: number) => (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex gap-2 self-end pl-5">
                          <div className="h-fit max-w-[500px] rounded-sm bg-amber-100 px-2.5 py-1">
                            <div>{chatItem.message}</div>
                          </div>
                          <Avatar
                            name="Margaret Brent"
                            variant="beam"
                            className="size-3 sm:size-6"
                          />
                        </div>

                        <div className="flex h-fit gap-2 self-start pr-5">
                          <TrainFrontTunnel className="block size-3 shrink-0 text-gray-600 sm:size-6" />
                          <div className="max-w-[500px] rounded-sm bg-green-100 px-2.5 py-1">
                            <div>{chatItem.answer}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2 pr-2 pb-4 pl-4 sm:pr-4 sm:pl-12">
                    <Textarea
                      id="chat-ai"
                      rows={3}
                      minLength={3}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      placeholder="Type your question here..."
                      // disabled={isPendingChatAI || isLoadingChatAI}
                    />
                    <Button
                      type="button"
                      className="inline-flex cursor-pointer items-center rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                      <SendHorizonal className="h-4 w-4" />
                    </Button>

                    <Dialog
                      open={showDialogAlertChatAI}
                      onOpenChange={setShowDialogAlertChatAI}
                    >
                      <DialogContent showCloseButton={false}>
                        <DialogHeader>
                          <DialogTitle>
                            Oops! Please enter a message with at least 3
                            characters.
                          </DialogTitle>
                          <DialogDescription>
                            Your message is too short to process. Kindly provide
                            more details so I can assist you better.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogClose asChild>
                          <Button
                            className="bg-red-500 text-white hover:bg-red-400 hover:text-white hover:opacity-90"
                            variant="outline"
                            onClick={() => setShowDialogAlertChatAI(false)}
                          >
                            Close
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          </main>
        ) : (
          <PreRegister isStudent={user?.isStudent} />
        )}
      </div>
    </div>
  );
}
