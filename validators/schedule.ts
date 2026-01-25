import { z } from "zod";

export const scheduleSchema = z.object({
  desc: z.string().min(1, "Description is required"),
  time: z.union([z.string(), z.date()]).transform(v => new Date(v)),
  looping: z.enum(["EVERYDAY", "WEEKDAYS", "WEEKENDS"]).nullable(),
  category: z.enum(["WORK_ACTIVITY", "PERSONAL_TIME", "SELF_DEVELOPMENT"]),
});

export type ScheduleFormType = z.infer<typeof scheduleSchema>;
