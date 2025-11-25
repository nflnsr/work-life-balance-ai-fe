export interface IProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  isStudent: boolean;
  age: number;
  field: string;
  hobbies?: string;
  hasAnsweredQuestionnaire: boolean;
  createdAt: Date;
}