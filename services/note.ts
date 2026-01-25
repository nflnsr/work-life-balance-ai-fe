import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { toast } from "sonner";
import { axiosGetPrivate, axiosPostPrivate } from "@/lib/axios";
import { INote } from "@/types/api/note";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { NoteFormType } from "@/validators/note";

const baseAPIUrl = "/api/note";

const useGetNotes = () => {
  const axiosPrivate = useAxiosPrivate();
  return useQuery({
    queryKey: ["notes"],
    queryFn: () => axiosGetPrivate<INote[]>(`${baseAPIUrl}/me`, axiosPrivate),
  });
};

const usePostNote = (
  params?: UseMutationOptions<any, any, NoteFormType>,
) => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-note"],
    mutationFn: (data: NoteFormType) =>
      axiosPostPrivate<any>(`${baseAPIUrl}`, data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note added successfully");
    },
    ...params,
  });
};

export { useGetNotes, usePostNote };
