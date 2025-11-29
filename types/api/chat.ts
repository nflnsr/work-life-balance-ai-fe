export interface IChat {
  id: number;
  message: string;
  answer: string;
  user: { chatQuota: number };
}
