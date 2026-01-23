"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import Avatar from "boring-avatars";
import { useAuthStore } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import PreRegister from "./_components/pre-register";
import { useState } from "react";
import { IChat } from "@/types/api/chat";
import { IWlb } from "@/types/api/wlb";
import { CircularProgress } from "@/components/ui/circular-progress";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Label } from "@/components/ui/label";
import { SendHorizonal, TrainFrontTunnel } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Sidebar } from "@/components/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { WorkLifeScore } from "./_components/work-life-score";
import { BalanceAdvisor } from "./_components/balance-advisor";
import { Schedule } from "./_components/schedule";
import { Note } from "./_components/note";

// const PreRegister = dynamic(() => import("./_components/pre-register"));

export default function Dashboard() {
  const { user } = useAuthStore();
  const [showDialogAlertChatAI, setShowDialogAlertChatAI] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const queryClient = useQueryClient();

  const { data: dataWlbHistory } = useQuery({
    queryKey: ["wlb-history"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/wlb/history");
      return data as IWlb[];
    },
  });

  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: `D${i + 1}`,
    score: dataWlbHistory?.[i]?.score,
  }));

  const { data: dataChat, isLoading: isLoadingChatAI } = useQuery({
    queryKey: ["chat"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/chat");
      return data as IChat[];
    },
  });

  const { data: dataChatQuota } = useQuery({
    queryKey: ["chat-quota"],
    queryFn: async () => {
      const { data } = await axiosPrivate.get("/chat/quota");
      return data;
    },
  });

  // const { data: dataQuotes } = useQuery({
  //   queryKey: ["quotes"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       "https://api.api-ninjas.com/v2/quotes?categories=success,wisdom",
  //       {
  //         headers: {
  //           "X-Api-Key": process.env.NEXT_PUBLIC_QUOTES_API_KEY || "",
  //         },
  //       },
  //     );
  //     return data;
  //   },
  // });

  const { mutate: mutateChatAi, isPending: isPendingChatAI } = useMutation({
    mutationKey: ["chat-ai"],
    mutationFn: async (message: string) => {
      const response = await axiosPrivate.post("/chat", { message });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat"] });
      queryClient.invalidateQueries({ queryKey: ["chat-quota"] });
    },
  });

  const chartConfig = {
    score: {
      label: "score",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="min-h-[100svh] max-w-screen bg-gray-50 lg:flex lg:flex-row">
      <Sidebar />
      <div className="h-screen min-h-screen w-full lg:h-auto">
        <DashboardHeader />

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
                <WorkLifeScore />

                <BalanceAdvisor />
              </div>
              <div className="flex w-full flex-col justify-between gap-5 sm:flex-row">
                <Schedule />

                <Note />
              </div>
            </div>

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
                        className={`gap-0 py-1 ${index === (dataWlbHistory?.length ?? 0) - 1 ? "border-teal-500" : ""} `}
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
                        Showing up and down trend for work-life score
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
                          className="h-40 text-green-400"
                        >
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="day"
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
                  quota left:{" "}
                  <span className="font-bold text-teal-600">
                    {dataChatQuota?.chatQuota ?? 8}
                  </span>
                </Label>
              </div>

              <div className="max-h-[550px] overflow-y-auto rounded-b-md border bg-white sm:max-h-[600px]">
                <div>
                  <div className="relative h-full min-h-24 space-y-2 px-2 pt-4 sm:px-4">
                    {(isLoadingChatAI || isPendingChatAI) && (
                      <div className="absolute top-1/2 left-1/2 z-10 flex size-full -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-white/40 py-10">
                        <span className="block size-20 animate-spin rounded-full border-t-2 border-b-2 border-stone-600" />
                      </div>
                    )}
                    {dataChat?.length === 0 &&
                      !isLoadingChatAI &&
                      !isPendingChatAI && (
                        <div className="mx-auto w-full py-4">
                          <p className="text-center text-[14px] text-gray-500">
                            No questions asked yet.
                          </p>
                          <p className="text-center text-[14px] text-gray-500">
                            Ask me now!
                          </p>
                        </div>
                      )}
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
                      disabled={
                        isPendingChatAI ||
                        isLoadingChatAI ||
                        dataChatQuota?.chatQuota <= 0
                      }
                    />
                    <Button
                      type="button"
                      className="inline-flex cursor-pointer items-center rounded-md bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none disabled:pointer-events-auto disabled:cursor-not-allowed"
                      onClick={() => {
                        const textarea = document.getElementById(
                          "chat-ai",
                        ) as HTMLTextAreaElement;
                        if (textarea) {
                          const message = textarea.value;
                          console.log(message, "ini pesan chat");
                          if (message.trim().length < 3) {
                            setShowDialogAlertChatAI(true);
                            return;
                          }
                          mutateChatAi(message);
                          textarea.value = "";
                        }
                      }}
                      disabled={
                        isPendingChatAI ||
                        isLoadingChatAI ||
                        dataChatQuota?.chatQuota <= 0
                      }
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
