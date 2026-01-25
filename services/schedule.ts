import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { AxiosInstance } from "axios";
import { ISchedule } from "@/types/api/schedule";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ScheduleFormType } from "@/validators/schedule";

const axiosGetPrivate = async <T>(
  endpoint: string,
  axiosPrivateHook: AxiosInstance,
) => (await axiosPrivateHook.get<T>(endpoint)).data;

const baseAPIUrl = "/api/schedule";

const useGetScheduleToday = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["schedule"],
    queryFn: () => axiosGetPrivate<ISchedule[]>(`${baseAPIUrl}/today`, axiosPrivate),
  });
};

const usePostSchedule = (
  params?: UseMutationOptions<any, any, ScheduleFormType>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-schedule"],
    mutationFn: async (data: ScheduleFormType) => {
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

export { useGetScheduleToday, usePostSchedule };
