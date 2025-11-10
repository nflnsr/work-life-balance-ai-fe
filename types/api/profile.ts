interface IProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  isStudent: boolean;
  age: number;
  field: string;
  hobbies?: string;
  hasAnsweredQuestionnaire: boolean;
}

export type { IProfile };