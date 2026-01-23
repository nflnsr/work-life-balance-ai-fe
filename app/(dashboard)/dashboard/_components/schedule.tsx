"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { CreateScheduleForm } from "@/types/api/schedule";
import { createSchedule, getScheduleToday } from "@/services/schedule";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function Schedule() {
  const [openAddSchedule, setOpenAddSchedule] = useState(false);

  const form = useForm<CreateScheduleForm>({
    defaultValues: {
      desc: "",
      time: new Date(),
      category: "PERSONAL_TIME",
      looping: null,
    },
  });

  const { data: dataSchedule } = getScheduleToday();

    const queryClient = useQueryClient();
  

  const { mutate: mutateCreateSchedule } = createSchedule({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      toast.success("Schedule added successfully");
      setOpenAddSchedule(false);
      form.reset();
    },
  });

  function onSubmit(data: CreateScheduleForm) {
    mutateCreateSchedule(data);
  }
  return (
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
          <Dialog open={openAddSchedule} onOpenChange={setOpenAddSchedule}>
            <DialogTrigger asChild>
              <Button className="h-7 bg-stone-200/70 hover:bg-stone-300 has-[>svg]:px-1.5">
                <Plus className="h-4 w-4 text-black" />
              </Button>
            </DialogTrigger>
            <DialogContent className="pb-5 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add schedule</DialogTitle>
                <DialogDescription>
                  Fill in the details below to add a new schedule.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-3">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                          <>
                            <Label htmlFor="desc">Your schedule</Label>
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
                    <div className="grid gap-1">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <>
                            <div className="flex h-full items-center gap-2">
                              <Label className="">Category</Label>
                              <FormMessage className="bg-white px-1 text-xs text-red-600 underline">
                                {form.formState.errors.category?.message}
                              </FormMessage>
                            </div>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex w-0 flex-wrap justify-between gap-0 px-2 text-nowrap min-[425px]:w-full min-[425px]:gap-2"
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
                    <div className="grid gap-1">
                      <FormField
                        control={form.control}
                        name="looping"
                        render={({ field }) => (
                          <>
                            <div className="flex h-full items-center gap-2">
                              <Label className="">Repeat schedule?</Label>
                              <FormMessage className="bg-white px-1 text-xs text-red-600 underline">
                                {form.formState.errors.category?.message}
                              </FormMessage>
                            </div>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value || ""}
                                className="flex w-0 flex-wrap justify-between gap-0 px-2 text-nowrap min-[425px]:w-full min-[425px]:gap-2"
                              >
                                <div className="flex items-center space-x-2 rounded-sm bg-white/90">
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
          <>
            {dataSchedule?.length === 0 && (
              <div className="mx-auto w-full pb-2">
                <p className="text-center text-[14px] text-gray-500">
                  There is no schedule for today.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setOpenAddSchedule(true)}
                    className="mx-auto block bg-stone-300/75 text-center text-black hover:bg-stone-200"
                  >
                    Create Now!
                  </Button>
                </div>
              </div>
            )}
            {dataSchedule?.map((item, index: number) => {
              const currentTime = new Date().toTimeString().slice(0, 5);

              const isPast =
                currentTime > new Date(item.time).toTimeString().slice(0, 5);
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
                      .replace(/\b\w/g, (c: string) => c.toUpperCase())}{" "}
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
  );
}
