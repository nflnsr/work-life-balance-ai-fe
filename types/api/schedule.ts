type Looping = "EVERYDAY" | "WEEKDAYS" | "WEEKENDS";
type Category = "PERSONAL_TIME" | "WORK_ACTIVITY" | "SELF_DEVELOPMENT";
interface ISchedule {
  id: number;
  desc: string;
  time: Date;
  looping?: Looping;
  category: Category;
}

export { type ISchedule, type Looping, type Category };