interface IChat {
  id: number;
  message: string;
  answer: string;
}

interface IChatQuota {
  chatQuota: number;
}

export { type IChat, type IChatQuota };