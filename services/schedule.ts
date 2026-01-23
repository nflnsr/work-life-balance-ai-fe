import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { AxiosInstance } from "axios";
import { toast } from "sonner";
import { CreateScheduleForm, ISchedule } from "@/types/api/schedule";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const axiosGetPrivate = async <T>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.get<T>(endpoint)).data;

const baseAPIUrl = "/schedule";

const getScheduleToday = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => axiosGetPrivate<ISchedule[]>(`${baseAPIUrl}/today`, axiosPrivate),
  });
};

const createSchedule = (
  params?: UseMutationOptions<any, any, CreateScheduleForm>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-schedule"],
    mutationFn: async (data: CreateScheduleForm) => {
      const response = await axiosPrivate.post("/schedule", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
      toast.success("Schedule added successfully");
    },
    ...params,
  });
};

export { getScheduleToday, createSchedule };
