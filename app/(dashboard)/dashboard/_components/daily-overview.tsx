"use client";

import { useGetWLBHistory } from "@/services/wlb";
import { useAuthStore } from "@/stores/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { TrendingUp } from "lucide-react";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function DailyOverview() {
  const { user } = useAuthStore();
  const { data: dataWlbHistory } = useGetWLBHistory();

  const chartConfig = {
    score: {
      label: "score",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const chartData = Array.from({ length: 7 }, (_, i) => ({
    day: `D${i + 1}`,
    score: dataWlbHistory?.[i]?.score,
  }));
  
  return (
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
          {["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"].map(
            (day, index) => (
              <Card
                key={day}
                className={`gap-0 py-1 ${index === (dataWlbHistory?.length ?? 0) - 1 ? "border-teal-500" : ""} `}
              >
                <CardHeader className="px-4 py-2 pb-2">
                  <CardTitle className="text-sm font-medium">{day}</CardTitle>
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
            ),
          )}
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
            <ChartContainer config={chartConfig} className="h-40 w-full">
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
                          const weekday = date.toLocaleDateString("en-US", {
                            weekday: "short",
                          });
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
  );
}
