export interface ISchedule {
  id: number;
  desc: string;
  time: Date;
  looping?: "EVERYDAY" | "WEEKDAYS" | "WEEKENDS";
  category: "WORK_ACTIVITY" | "PERSONAL_TIME" | "SELF_DEVELOPMENT";
}
