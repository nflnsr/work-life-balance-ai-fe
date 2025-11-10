interface Response<TData = unknown> {
  status: "success" | "error";
  message: string;
  data?: TData;
}

export type { Response };
