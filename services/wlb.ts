import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { axiosGetPrivate, axiosPatchPrivate } from "@/lib/axios";
import { IWlb } from "@/types/api/wlb";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RecommendationFormType } from "@/validators/wlb";

const baseAPIUrl = "/api/wlb";

const useGetWLBLatest = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["wlb-latest"],
    queryFn: () => axiosGetPrivate<IWlb>(`${baseAPIUrl}/latest`, axiosPrivate),
  });
};

const useGetWLBHistory = () => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ["wlb-history"],
    queryFn: () =>
      axiosGetPrivate<IWlb[]>(`${baseAPIUrl}/history`, axiosPrivate),
  });
};

const usePatchRecommendation = (
  params?: UseMutationOptions<any, any, RecommendationFormType>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-recommendation"],
    mutationFn: (id) =>
      axiosPatchPrivate<RecommendationFormType>(
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

export { useGetWLBLatest, useGetWLBHistory, usePatchRecommendation };
