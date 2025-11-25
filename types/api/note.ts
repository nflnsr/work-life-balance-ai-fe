export interface INote {
  id: number;
  date: Date;
  items: {
    id: number;
    content: string;
  }[];
}
