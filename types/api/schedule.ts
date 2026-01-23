type Looping = "EVERYDAY" | "WEEKDAYS" | "WEEKENDS";
type Category = "PERSONAL_TIME" | "WORK_ACTIVITY" | "SELF_DEVELOPMENT";
interface ISchedule {
  id: number;
  desc: string;
  time: Date;
  looping?: Looping;
  category: Category;
}
interface CreateScheduleForm {
  desc: string;
  time: Date;
  category: Category;
  looping?: Looping | "" | null;
}

export { type ISchedule, type CreateScheduleForm, type Looping, type Category };