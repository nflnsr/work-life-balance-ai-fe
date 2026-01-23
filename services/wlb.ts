import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { axiosGetPrivate, axiosPatchPrivate } from "@/lib/utils";
import { IWlb } from "@/types/api/wlb";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";



const baseAPIUrl = "/wlb";

const getWLBLatest = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["wlb-latest"],
    queryFn: () => axiosGetPrivate<IWlb>(`${baseAPIUrl}/latest`, axiosPrivate),
  });
};

const getWLBHistory = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["wlb-history"],
    queryFn: () =>
      axiosGetPrivate<IWlb[]>(`${baseAPIUrl}/history`, axiosPrivate),
  });
};

const updateRecommendation = (
  params?: UseMutationOptions<any, any, number>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-recommendation"],
    mutationFn: (id) =>
      axiosPatchPrivate<any>(
        `${baseAPIUrl}/recommendation/${id}`,
        axiosPrivate,
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wlb-latest"] });
      toast.success("Recommendation marked as completed");
    },
    ...params,
  });
};

export { getWLBLatest, getWLBHistory, updateRecommendation };
