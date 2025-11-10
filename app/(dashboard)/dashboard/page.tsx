"use client";

import PreRegister from "./_components/pre-register";
// import dynamic from "next/dynamic";
import { GoogleGenAI } from "@google/genai";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Compass,
  Heart,
  Home,
  Menu,
  Minus,
  Plus,
  Settings,
  Sliders,
  User,
  X,
  XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
// import { useAuth } from "@/hooks/use-auth";
// import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// const PreRegister = dynamic(() => import("./_components/pre-register"));

interface Inputs {
  name: string;
  email: string;
  phone: string;
  address: string;
  hobby: string;
}

type Looping = "EVERYDAY" | "WEEKDAYS" | "WEEKENDS";
type Category = "PERSONAL_TIME" | "WORK_ACTIVITY" | "SELF_DEVELOPMENT";

interface CreateScheduleForm {
  desc: string;
  time: Date;
  category: Category;
  looping?: Looping | "" | null;
}

export default function Dashboard() {
  const { user, isLoading, setIsLoading } = useAuthStore();
  console.log("user di dashboard:", user);
  const [openAddSchedule, setOpenAddSchedule] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState({
    role: "system",
    content: "You are a helpful assistant.",
  });
  const [answers, setAnswers] = useState<string[]>([]);
  const ai = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "",
  });
  const [openAddNotes, setOpenAddNotes] = useState(false);

  const chat = async () => {
    // e.preventDefault();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: messages.content,

      config: {
        httpOptions: {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "",
          },
        },
      },
    });
    setAnswers((prev) => [...prev, response.text ?? ""]);
    console.log(response.text);
  };

  const form = useForm<CreateScheduleForm>({
    defaultValues: {
      desc: "",
      time: new Date(),
      category: "PERSONAL_TIME",
      looping: null,
    },
  });

  const { mutate: mutateCreateSchedule } = useMutation({
    mutationKey: ["create-schedule"],
    mutationFn: async (data: CreateScheduleForm) => {
      const response = await axiosPrivate.post("/schedule", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      setOpenAddSchedule(false);
      toast.success("Schedule added successfully");
      form.reset();
    },
  });

  function onSubmit(data: CreateScheduleForm) {
    console.log("Submitting form with input:", data);
    data.looping === "" && (data.looping = null);
    mutateCreateSchedule(data);
  }

  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const { mutate: mutateAddNotes } = useMutation({
    mutationKey: ["add-notes"],
    mutationFn: async (notes: string) => {
      const data = await axiosPrivate.post("/note", { content: notes });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { data: dataNotes } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/note/me");
      console.log("data notes:", data);
      return data;
    },
  });

  const { data: dataSchedule } = useQuery({
    queryKey: ["schedule"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/schedule/today");
      console.log("data schedule:", data);
      return data;
    },
  });

  const { mutate: mutateLogout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await axiosPrivate.post("/user/logout");
      return response.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["auth"] });
      useAuthStore.getState().clearAuthStore();
      toast.success("Logout successful");
    },
  });

  const currentTime = new Date().toTimeString().slice(0, 5);

  useEffect(() => {
    setIsLoading?.(true);
    if (user?.field) {
      setIsLoading?.(false);
    }
  }, [user?.field, setIsLoading]);

  return (
    <div className="min-h-screen max-w-screen bg-gray-50 lg:flex lg:flex-row">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 ${sidebarOpen ? "block" : "hidden"} lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 top-0 left-0 z-50 h-screen w-64 transform bg-white shadow-lg transition-transform duration-500 ease-in-out lg:sticky lg:w-64 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${!user?.field && "blur-xs"}`}
      >
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
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Calendar className="h-5 w-5" />
              Calendar
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
              Wellness
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
            >
              <Sliders className="h-5 w-5" />
              Goals
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
          <div className="absolute bottom-4 w-full px-4">
            <Button disabled={isLoadingLogout} onClick={() => mutateLogout()} className="w-full cursor-pointer bg-red-500/85 text-white hover:bg-red-400/90">
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
                  Alex Johnson
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        {user?.hasAnsweredQuestionnaire ? (
          <main className="h- p-6 pb-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor and improve your work-life balance
              </p>
            </div>

            {/* Recommendations and Today's Schedule */}
            <div className="flex flex-col justify-between gap-5 md:h-[600px] md:flex-row">
              <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
                {/* Today's Schedule */}
                <Card className="scroll-box h-[400px] w-full overflow-y-auto md:h-auto">
                  <CardHeader className="flex w-full flex-row justify-between space-y-0 pb-5">
                    <div className="">
                      <CardTitle>Today&apos;s Schedule</CardTitle>
                      <CardDescription className="pt-0.5 text-[14px]">
                        Thursday, May 7, 2025
                      </CardDescription>
                    </div>
                    <div>
                      <Dialog
                        open={openAddSchedule}
                        onOpenChange={setOpenAddSchedule}
                      >
                        <DialogTrigger asChild>
                          <Button className="h-7 bg-stone-200/70 hover:bg-stone-300 has-[>svg]:px-1.5">
                            <Plus className="h-4 w-4 text-black" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="pb-5 sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add schedule</DialogTitle>
                            <DialogDescription>
                              Make changes to your profile here. Click save when
                              you&apos;re done.
                            </DialogDescription>
                          </DialogHeader>
                          <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                              <div className="grid gap-4">
                                <div className="grid gap-3">
                                  <FormField
                                    control={form.control}
                                    name="desc"
                                    render={({ field }) => (
                                      <>
                                        <Label htmlFor="desc">
                                          Your schedule
                                        </Label>
                                        <Input
                                          id="desc"
                                          type="text"
                                          placeholder="your schedule..."
                                          {...field}
                                        />
                                      </>
                                    )}
                                  />
                                </div>
                                <div className="grid gap-3">
                                  <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                      <>
                                        <Label htmlFor="time">Time</Label>
                                        <Input
                                          id="time"
                                          type="time"
                                          placeholder="select time"
                                          name={field.name}
                                          className="inline-block"
                                          // min={currentTime}
                                          // max="23:59"
                                          onChange={(e) => {
                                            const [hours, minutes] =
                                              e.target.value.split(":");
                                            const now = new Date();
                                            now.setHours(
                                              Number(hours),
                                              Number(minutes),
                                              0,
                                              0,
                                            );
                                            field.onChange(now);
                                          }}
                                        />
                                      </>
                                    )}
                                  />
                                </div>
                                <div className="grid gap-3">
                                  <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                      <>
                                        <div className="flex h-full items-center gap-2">
                                          <Label className="">Category</Label>
                                          <FormMessage className="bg-white px-1 text-xs text-red-600 underline">
                                            {
                                              form.formState.errors.category
                                                ?.message
                                            }
                                          </FormMessage>
                                        </div>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex w-full justify-between px-2 text-nowrap"
                                          >
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="PERSONAL_TIME"
                                                id="personal-time-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="personal-time-option"
                                                className="text-[13px]"
                                              >
                                                Personal Time
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="WORK_ACTIVITY"
                                                id="work-activity-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="work-activity-option"
                                                className="text-[13px]"
                                              >
                                                Work Activity
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="SELF_DEVELOPMENT"
                                                id="self-development-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="self-development-option"
                                                className="text-[13px]"
                                              >
                                                Self Development
                                              </Label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </>
                                    )}
                                  />
                                </div>
                                <div className="grid gap-3">
                                  <FormField
                                    control={form.control}
                                    name="looping"
                                    render={({ field }) => (
                                      <>
                                        <div className="flex h-full items-center gap-2">
                                          <Label className="">
                                            Repeat schedule?
                                          </Label>
                                          <FormMessage className="bg-white px-1 text-xs text-red-600 underline">
                                            {
                                              form.formState.errors.category
                                                ?.message
                                            }
                                          </FormMessage>
                                        </div>
                                        <FormControl>
                                          <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value || ""}
                                            className="flex w-full justify-between px-2 text-nowrap"
                                          >
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value=""
                                                id="only-today-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="only-today-option"
                                                className="text-[13px]"
                                              >
                                                Only today
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="EVERYDAY"
                                                id="everyday-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="everyday-option"
                                                className="text-[13px]"
                                              >
                                                Everyday
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="WEEKDAYS"
                                                id="weekdays-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="weekdays-option"
                                                className="text-[13px]"
                                              >
                                                Weekdays
                                              </Label>
                                            </div>
                                            <div className="flex items-center space-x-2 rounded-sm bg-white/90 py-0.5">
                                              <RadioGroupItem
                                                value="WEEKENDS"
                                                id="weekends-option"
                                                className="size-2 ring-1"
                                              />
                                              <Label
                                                htmlFor="weekends-option"
                                                className="text-[13px]"
                                              >
                                                Weekends
                                              </Label>
                                            </div>
                                          </RadioGroup>
                                        </FormControl>
                                      </>
                                    )}
                                  />
                                </div>
                              </div>
                              <DialogFooter className="pt-4">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Add schedule</Button>
                              </DialogFooter>
                            </form>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* {dataSchedule.length > 0 ? (
                        dataSchedule.map((items: { items: any[] }) => {
                          const item = items.items;
                          return ( */}
                      <>
                        {dataSchedule.map((item: any, index: number) => {
                          const isPast =
                            currentTime >
                            new Date(item.time).toTimeString().slice(0, 5);
                          return (
                            <div
                              key={index}
                              className="relative border-l border-gray-200 pb-4 pl-6"
                            >
                              <div
                                className={`absolute top-0 left-0 h-4 w-4 -translate-x-1/2 rounded-full ${item.category === "PERSONAL_TIME" ? "bg-teal-500" : item.category === "WORK_ACTIVITY" ? "bg-amber-500" : "bg-gray-400"}`}
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
                      </>
                    </div>
                  </CardContent>
                </Card>

                {/* Your Great Notes */}
                <Card className="scroll-box h-[400px] w-full overflow-y-auto md:h-auto">
                  <CardHeader className="flex w-full flex-row justify-between space-y-0 pb-5">
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
                        onClick={() => setOpenAddNotes(!openAddNotes)}
                        className={`h-7 has-[>svg]:px-1.5 ${openAddNotes ? "bg-red-400 hover:bg-red-400/85" : "bg-stone-200/70 hover:bg-stone-300"}`}
                      >
                        {openAddNotes ? (
                          <XIcon className="h-4 w-4 fill-white text-white" />
                        ) : (
                          <Plus className="h-4 w-4 text-black" />
                        )}
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
                              const textarea = document.getElementById(
                                "addNotes",
                              ) as HTMLTextAreaElement;
                              if (textarea) {
                                const notes = textarea.value;
                                mutateAddNotes(notes);
                              }
                            }}
                            className="absolute right-3 bottom-1 bg-teal-500 text-white hover:bg-teal-600"
                          >
                            Save
                          </Button>
                        </>
                      )}
                    </div>
                    <div className="space-y-3">
                      {new Date().toLocaleDateString("en-US", {
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
                                There's no note for today.
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
                          {dataNotes?.[0]?.items.map((item: any) => (
                            <li key={item.id} className="text-sm text-gray-500">
                              {item.content}
                            </li>
                          ))}
                          {/* <li className="text-sm text-gray-500">
                            Hari ini udah ngantuk banget, pengen cepet-cepet
                            tidur aja deh.
                          </li>
                          <li className="text-sm text-gray-500">
                            Meeting sama tim lancar bgt, orangnya kocak2
                          </li>
                          <li className="text-sm text-gray-500">
                            hari ini tugas harus kelarrr....
                          </li> */}
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardHeader className="pb-3">
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
                        {new Date().toLocaleDateString("en-US", {
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
                          ? dataNotes?.map((note: any) => (
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
                                {note.items.map((item: any) => (
                                  <li
                                    key={item.id}
                                    className="text-sm text-gray-500"
                                  >
                                    {item.content}
                                  </li>
                                ))}
                              </div>
                            ))
                          : dataNotes
                              ?.slice(1) // hilangkan array pertama jika tanggal sama
                              .map((note: any) => (
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
                                  {note.items.map((item: any) => (
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
                    <div className="space-y-2">
                      <p className="text-[14px] text-gray-500">
                        Saturday, May 6, 2025
                      </p>
                      <li className="text-sm text-gray-500">jogging</li>
                      <li className="text-sm text-gray-500">service motor</li>
                      <li className="text-sm text-gray-500">nyuci baju</li>
                      <li className="text-sm text-gray-500">nyetok makanan</li>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[14px] text-gray-500">
                        Saturday, May 6, 2025
                      </p>
                      <li className="text-sm text-gray-500">jogging</li>
                      <li className="text-sm text-gray-500">service motor</li>
                      <li className="text-sm text-gray-500">nyuci baju</li>
                      <li className="text-sm text-gray-500">nyetok makanan</li>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex w-full flex-col justify-between gap-5">
                {/* Balance Score */}
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <CardTitle>Work-Life Balance Score</CardTitle>
                    <CardDescription>
                      Your current balance score based on activity tracking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      <div className="relative h-40 w-40">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <span className="block text-4xl font-bold text-teal-600">
                              72
                            </span>
                            <span className="text-sm text-gray-500">Good</span>
                          </div>
                        </div>
                        <svg className="h-full w-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-200"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-teal-600"
                            strokeWidth="10"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 * (1 - 0.72)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 space-y-4">
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Work Hours
                            </span>
                            <span className="text-sm text-gray-500">
                              42h / week
                            </span>
                          </div>
                          <Progress value={70} className="h-2 bg-gray-200" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Personal Time
                            </span>
                            <span className="text-sm text-gray-500">
                              28h / week
                            </span>
                          </div>
                          <Progress value={47} className="h-2 bg-gray-200" />
                        </div>
                        <div>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Sleep Quality
                            </span>
                            <span className="text-sm text-gray-500">Good</span>
                          </div>
                          <Progress value={80} className="h-2 bg-gray-200" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card className="h-full overflow-y-auto">
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      AI-powered suggestions to improve your balance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      <li className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                          <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">
                            Reduce overtime hours
                          </h4>
                          <p className="text-sm text-gray-500">
                            You&apos;ve worked late 3 days this week. Try to
                            leave on time tomorrow.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                          <Heart className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">
                            Schedule a wellness activity
                          </h4>
                          <p className="text-sm text-gray-500">
                            You haven&apos;t had any exercise in 4 days.
                            Consider a 30-minute walk.
                          </p>
                        </div>
                      </li>
                      <li className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">
                            Block focus time
                          </h4>
                          <p className="text-sm text-gray-500">
                            Your calendar shows back-to-back meetings. Block 2
                            hours for focused work.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* versi grid */}

            <div className="mb-8"></div>

            {/* Weekly Overview */}
            <div className="mb-8">
              <Tabs defaultValue="activity">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Weekly Overview</h2>
                  <TabsList>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="activity">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <Card
                          key={day}
                          className={index === 3 ? "border-teal-500" : ""}
                        >
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm font-medium">
                              {day}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <div className="space-y-2">
                              <div className="flex items-center text-xs">
                                <div className="mr-2 h-3 w-3 rounded-sm bg-amber-500"></div>
                                <span>Work: {index === 3 ? "10h" : "8h"}</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <div className="mr-2 h-3 w-3 rounded-sm bg-teal-500"></div>
                                <span>
                                  Personal: {index === 3 ? "2h" : "4h"}
                                </span>
                              </div>
                              <div className="flex items-center text-xs">
                                <div className="mr-2 h-3 w-3 rounded-sm bg-blue-500"></div>
                                <span>Sleep: {index === 3 ? "6h" : "8h"}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ),
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="trends">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex h-[200px] items-end justify-between gap-2">
                        {[35, 42, 58, 75, 68, 72, 70].map((value, index) => (
                          <div key={index} className="relative w-full">
                            <div
                              className="rounded-t-sm bg-teal-500"
                              style={{ height: `${value}%` }}
                            ></div>
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform text-xs text-gray-500">
                              Week {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 text-center text-sm text-gray-500">
                        Balance score trend over the past 7 weeks
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <p>
                {answers.length > 0
                  ? answers.map((answer, index) => (
                      <span key={index} className="mt-2 block">
                        {answer}
                      </span>
                    ))
                  : "Ask a question to get started!"}
              </p>
            </div>

            <div>
              <div className="mb-4">
                <Label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ask a question
                </Label>
                <Textarea
                  id="message"
                  // {...register("hobby", { required: true })}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Type your question here..."
                  value={messages.content}
                  onChange={(e) =>
                    setMessages({ ...messages, content: e.target.value })
                  }
                />
              </div>
              <Button
                type="button"
                className="inline-flex items-center rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                onClick={() => {
                  const textarea = document.getElementById(
                    "addNotes",
                  ) as HTMLTextAreaElement;
                  if (textarea) {
                    const content = textarea.value;
                    setMessages({ role: "user", content });
                    chat();
                  }
                }}
              >
                Submit
              </Button>
            </div>
          </main>
        ) : (
          <PreRegister isStudent={user?.isStudent} />
        )}
      </div>
    </div>
  );
}
